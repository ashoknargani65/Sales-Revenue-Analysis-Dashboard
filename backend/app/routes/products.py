from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, desc, or_
from typing import List, Optional
from app.database import get_db
from app.models.sales import Sales
from app.schemas.sales import ProductAnalysis
from app.services.analytics_service import AnalyticsService
from app.routes.dashboard import filter_params
import math

router = APIRouter()

@router.get("", response_model=List[ProductAnalysis])
def get_products(
    page: int = 1,
    limit: int = 20,
    search: Optional[str] = None,
    sort_by: Optional[str] = "revenue",
    sort_order: Optional[str] = "desc",
    db: Session = Depends(get_db),
    filters: dict = Depends(filter_params)
):
    query = db.query(
        Sales.product,
        Sales.category,
        func.sum(Sales.quantity).label('units_sold'),
        func.sum(Sales.revenue).label('revenue'),
        func.sum(Sales.profit).label('profit')
    ).group_by(Sales.product, Sales.category)
    
    query = AnalyticsService.apply_filters(query, **filters)
    
    if search:
        search_term = f"%{search}%"
        query = query.filter(Sales.product.ilike(search_term))
        
    # Sorting logic
    sort_col = {
        "revenue": desc('revenue') if sort_order == "desc" else 'revenue',
        "profit": desc('profit') if sort_order == "desc" else 'profit',
        "units_sold": desc('units_sold') if sort_order == "desc" else 'units_sold'
    }.get(sort_by, desc('revenue'))
    
    query = query.order_by(sort_col)
    results = query.offset((page - 1) * limit).limit(limit).all()
    
    response = []
    start_rank = (page - 1) * limit + 1
    for i, r in enumerate(results):
        revenue = float(r.revenue or 0)
        profit = float(r.profit or 0)
        profit_margin = (profit / revenue * 100) if revenue > 0 else 0
        response.append({
            "rank": start_rank + i,
            "product": r.product,
            "category": r.category,
            "units_sold": int(r.units_sold or 0),
            "revenue": revenue,
            "profit": profit,
            "profit_margin": profit_margin
        })
        
    return response
