from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models.sales import Sales
from app.schemas.filters import FilterOptions

router = APIRouter()

@router.get("", response_model=FilterOptions)
def get_filters(db: Session = Depends(get_db)):
    categories = [r[0] for r in db.query(Sales.category).distinct().order_by(Sales.category).all()]
    regions = [r[0] for r in db.query(Sales.region).distinct().order_by(Sales.region).all()]
    products = [r[0] for r in db.query(Sales.product).distinct().order_by(Sales.product).all()]
    salespeople = [r[0] for r in db.query(Sales.salesperson).distinct().filter(Sales.salesperson.isnot(None)).order_by(Sales.salesperson).all()]
    
    date_bounds = db.query(
        func.min(Sales.order_date).label('min_date'),
        func.max(Sales.order_date).label('max_date')
    ).one()
    
    return {
        "categories": categories,
        "regions": regions,
        "products": products,
        "salespeople": salespeople,
        "date_range": {
            "min": str(date_bounds.min_date) if date_bounds.min_date else "",
            "max": str(date_bounds.max_date) if date_bounds.max_date else ""
        }
    }
