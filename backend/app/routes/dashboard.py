from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.schemas.dashboard import DashboardSummary, RevenueTrend, SalesTrend, CategoryAnalysis, RegionAnalysis, TopProduct, ProfitAnalysis
from app.analytics import kpis, trends, products, categories, regions

router = APIRouter()

def filter_params(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    region: Optional[str] = None,
    category: Optional[str] = None,
    product: Optional[str] = None,
    salesperson: Optional[str] = None
):
    return {
        "start_date": start_date,
        "end_date": end_date,
        "region": region,
        "category": category,
        "product": product,
        "salesperson": salesperson
    }

@router.get("/summary", response_model=DashboardSummary)
def get_summary(db: Session = Depends(get_db), filters: dict = Depends(filter_params)):
    return kpis.get_dashboard_summary(db, **filters)

@router.get("/revenue-trend", response_model=List[RevenueTrend])
def get_revenue_trend(db: Session = Depends(get_db), filters: dict = Depends(filter_params)):
    return trends.get_revenue_trend(db, **filters)

@router.get("/sales-trend", response_model=List[SalesTrend])
def get_sales_trend(db: Session = Depends(get_db), filters: dict = Depends(filter_params)):
    return trends.get_sales_trend(db, **filters)

@router.get("/category-analysis", response_model=List[CategoryAnalysis])
def get_category_analysis(db: Session = Depends(get_db), filters: dict = Depends(filter_params)):
    return categories.get_category_analysis(db, **filters)

@router.get("/region-analysis", response_model=List[RegionAnalysis])
def get_region_analysis(db: Session = Depends(get_db), filters: dict = Depends(filter_params)):
    return regions.get_region_analysis(db, **filters)

@router.get("/top-products", response_model=List[TopProduct])
def get_top_products(
    limit: int = 10,
    db: Session = Depends(get_db),
    filters: dict = Depends(filter_params)
):
    return products.get_top_products(db, limit=limit, **filters)

@router.get("/profit-analysis", response_model=List[ProfitAnalysis])
def get_profit_analysis(db: Session = Depends(get_db), filters: dict = Depends(filter_params)):
    return categories.get_profit_analysis(db, **filters)
