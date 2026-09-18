from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from app.models.sales import Sales
from app.services.analytics_service import AnalyticsService

def get_top_products(db: Session, limit: int = 10, **filters):
    query = db.query(
        Sales.product,
        func.sum(Sales.revenue).label('revenue'),
        func.sum(Sales.profit).label('profit'),
        func.sum(Sales.quantity).label('quantity')
    ).group_by(Sales.product).order_by(desc('revenue'))
    
    query = AnalyticsService.apply_filters(query, **filters)
    results = query.limit(limit).all()
    
    return [{
        "product": r.product,
        "revenue": float(r.revenue or 0),
        "profit": float(r.profit or 0),
        "quantity": int(r.quantity or 0)
    } for r in results]
