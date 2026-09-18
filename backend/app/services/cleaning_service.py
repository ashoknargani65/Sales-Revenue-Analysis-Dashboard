import pandas as pd
import numpy as np
from sqlalchemy.orm import Session
from app.models.sales import Sales
from fastapi import HTTPException
from app.schemas.upload import UploadResponse

class CleaningService:
    REQUIRED_COLUMNS = [
        "Order_ID", "Order_Date", "Product", "Category",
        "Region", "Quantity", "Unit_Price", "Cost", "Salesperson"
    ]

    @staticmethod
    def normalize_columns(df: pd.DataFrame) -> pd.DataFrame:
        # Standardize basic variations
        col_mapping = {
            "order id": "Order_ID", "order_id": "Order_ID", "orderid": "Order_ID",
            "order date": "Order_Date", "order_date": "Order_Date", "orderdate": "Order_Date",
            "product": "Product", "category": "Category", "region": "Region",
            "quantity": "Quantity", "unit price": "Unit_Price", "unit_price": "Unit_Price", "unitprice": "Unit_Price",
            "cost": "Cost", "salesperson": "Salesperson"
        }
        df.columns = [str(col).strip() for col in df.columns]
        df.rename(columns={col: col_mapping.get(col.lower(), col) for col in df.columns}, inplace=True)
        return df

    @staticmethod
    def validate_columns(df: pd.DataFrame):
        missing = [col for col in CleaningService.REQUIRED_COLUMNS if col not in df.columns]
        if missing:
            raise HTTPException(status_code=400, detail={
                "message": "Required columns are missing.",
                "missing_columns": missing
            })

    @staticmethod
    def clean_currency(series: pd.Series) -> pd.Series:
        if series.dtype == 'object':
            # Remove symbols and commas
            return series.replace(r'[₹$,]', '', regex=True).astype(float)
        return pd.to_numeric(series, errors='coerce')

    @staticmethod
    def process_and_store(df: pd.DataFrame, db: Session) -> UploadResponse:
        total_records = len(df)
        
        df = CleaningService.normalize_columns(df)
        CleaningService.validate_columns(df)
        
        # Remove completely empty rows
        df.dropna(how='all', inplace=True)
        
        # Detect and remove exact duplicates based on Order_ID and Product
        duplicates_mask = df.duplicated(subset=['Order_ID', 'Product'], keep='first')
        duplicate_records = duplicates_mask.sum()
        df = df[~duplicates_mask]
        
        # Clean numeric data
        df['Quantity'] = pd.to_numeric(df['Quantity'], errors='coerce')
        df['Unit_Price'] = CleaningService.clean_currency(df['Unit_Price'])
        df['Cost'] = CleaningService.clean_currency(df['Cost'])
        
        # Convert Date
        df['Order_Date'] = pd.to_datetime(df['Order_Date'], errors='coerce')
        
        # Drop rows with critical missing data
        critical_cols = ['Order_ID', 'Order_Date', 'Product', 'Category', 'Region', 'Quantity', 'Unit_Price', 'Cost']
        initial_len = len(df)
        df.dropna(subset=critical_cols, inplace=True)
        rejected_records = initial_len - len(df)
        
        # Calculate derived fields (interpreting Cost as Total Cost per transaction per rules)
        df['Revenue'] = df['Quantity'] * df['Unit_Price']
        df['Profit'] = df['Revenue'] - df['Cost']
        # Profit Margin = (Profit / Revenue) * 100
        df['Profit_Margin'] = np.where(df['Revenue'] == 0, 0, (df['Profit'] / df['Revenue']) * 100)
        
        processed_records = len(df)
        
        if processed_records == 0:
            raise HTTPException(status_code=400, detail="The uploaded file does not contain any valid sales records after cleaning.")
            
        # Store to DB
        sales_records = df.to_dict(orient='records')
        
        # For simplicity in this upload flow, we can do a bulk insert. 
        # In a real app we might update existing or handle conflicts on Order_ID.
        db_records = [
            Sales(
                order_id=str(row['Order_ID']),
                order_date=row['Order_Date'].date(),
                product=str(row['Product']),
                category=str(row['Category']),
                region=str(row['Region']),
                quantity=int(row['Quantity']),
                unit_price=row['Unit_Price'],
                cost=row['Cost'],
                salesperson=str(row['Salesperson']) if pd.notna(row['Salesperson']) else None,
                revenue=row['Revenue'],
                profit=row['Profit'],
                profit_margin=row['Profit_Margin']
            )
            for row in sales_records
        ]
        
        db.bulk_save_objects(db_records)
        db.commit()
        
        return UploadResponse(
            message="File processed successfully.",
            total_records=total_records,
            processed_records=processed_records,
            rejected_records=rejected_records,
            duplicate_records=duplicate_records
        )
