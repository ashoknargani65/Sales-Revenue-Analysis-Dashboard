import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pandas as pd
from app.database import SessionLocal, engine, Base
from app.services.cleaning_service import CleaningService
from app.models.sales import Sales
import io

def load_data():
    db = SessionLocal()
    filepath = 'data/sample_sales_data.csv'
    
    if not os.path.exists(filepath):
        print(f"File {filepath} not found. Please run generate_data.py first.")
        return

    print("Reading data...")
    df = pd.read_csv(filepath)
    
    print("Cleaning and inserting data...")
    # Check if data already exists to prevent duplication
    existing_count = db.query(Sales).count()
    if existing_count > 0:
        print(f"Database already contains {existing_count} records. Skipping load to prevent duplicates.")
        return

    response = CleaningService.process_and_store(df, db)
    print(f"Successfully loaded {response.processed_records} records.")
    
    db.close()

if __name__ == "__main__":
    # Ensure tables exist
    Base.metadata.create_all(bind=engine)
    load_data()
