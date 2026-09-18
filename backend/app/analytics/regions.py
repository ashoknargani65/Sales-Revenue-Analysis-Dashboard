from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.sales import Sales
from app.services.analytics_service import AnalyticsService

def get_region_analysis(db: Session, **filters):
    query = db.query(
        Sales.region,
        func.sum(Sales.revenue).label('revenue'),
        func.sum(Sales.quantity * Sales.unit_price).label('sales'),
        func.sum(Sales.profit).label('profit')
    ).group_by(Sales.region)
    
    query = AnalyticsService.apply_filters(query, **filters)
    results = query.all()
    
    return [{
        "region": r.region,
        "revenue": float(r.revenue or 0),
        "sales": float(r.sales or 0),
        "profit": float(r.profit or 0)
    } for r in results]
