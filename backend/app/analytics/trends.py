from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.sales import Sales
from app.services.analytics_service import AnalyticsService

def get_revenue_trend(db: Session, **filters):
    # Using func.to_char for PostgreSQL month formatting (e.g. 'Jan 2026')
    # fallback for sqlite if needed, but requirements state PostgreSQL
    query = db.query(
        func.to_char(func.date_trunc('month', Sales.order_date), 'Mon YYYY').label('month'),
        func.date_trunc('month', Sales.order_date).label('month_date'),
        func.sum(Sales.revenue).label('revenue')
    ).group_by(
        'month', 'month_date'
    ).order_by('month_date')
    
    query = AnalyticsService.apply_filters(query, **filters)
    results = query.all()
    
    return [{"month": r.month, "revenue": float(r.revenue or 0)} for r in results]

def get_sales_trend(db: Session, **filters):
    query = db.query(
        func.to_char(func.date_trunc('month', Sales.order_date), 'Mon YYYY').label('month'),
        func.date_trunc('month', Sales.order_date).label('month_date'),
        func.sum(Sales.quantity * Sales.unit_price).label('sales')
    ).group_by(
        'month', 'month_date'
    ).order_by('month_date')
    
    query = AnalyticsService.apply_filters(query, **filters)
    results = query.all()
    
    return [{"month": r.month, "sales": float(r.sales or 0)} for r in results]
