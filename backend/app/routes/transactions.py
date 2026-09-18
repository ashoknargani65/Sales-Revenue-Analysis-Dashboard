from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional
from app.database import get_db
from app.models.sales import Sales
from app.schemas.sales import TransactionResponse
from app.services.analytics_service import AnalyticsService
from app.routes.dashboard import filter_params
import math

router = APIRouter()

@router.get("", response_model=TransactionResponse)
def get_transactions(
    page: int = 1,
    limit: int = 20,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    filters: dict = Depends(filter_params)
):
    query = db.query(Sales)
    query = AnalyticsService.apply_filters(query, **filters)
    
    if search:
        search_term = f"%{search}%"
        query = query.filter(or_(
            Sales.product.ilike(search_term),
            Sales.order_id.ilike(search_term)
        ))
        
    total = query.count()
    total_pages = math.ceil(total / limit) if limit > 0 else 0
    
    transactions = query.order_by(Sales.order_date.desc()).offset((page - 1) * limit).limit(limit).all()
    
    # Map to schema mapping order_date -> date
    data = []
    for t in transactions:
        data.append({
            "order_id": t.order_id,
            "date": t.order_date,
            "product": t.product,
            "category": t.category,
            "region": t.region,
            "quantity": t.quantity,
            "revenue": t.revenue,
            "profit": t.profit
        })
        
    return {
        "data": data,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "total_pages": total_pages
        }
    }
