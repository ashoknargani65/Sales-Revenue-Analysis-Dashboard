from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.sales import Sales
from app.services.analytics_service import AnalyticsService

def get_category_analysis(db: Session, **filters):
    query = db.query(
        Sales.category,
        func.sum(Sales.revenue).label('revenue'),
        func.sum(Sales.quantity * Sales.unit_price).label('sales'),
        func.sum(Sales.profit).label('profit')
    ).group_by(Sales.category)
    
    query = AnalyticsService.apply_filters(query, **filters)
    results = query.all()
    
    return [{
        "category": r.category,
        "revenue": float(r.revenue or 0),
        "sales": float(r.sales or 0),
        "profit": float(r.profit or 0)
    } for r in results]

def get_profit_analysis(db: Session, **filters):
    query = db.query(
        Sales.category,
        func.sum(Sales.profit).label('profit'),
        func.sum(Sales.revenue).label('revenue')
    ).group_by(Sales.category)
    
    query = AnalyticsService.apply_filters(query, **filters)
    results = query.all()
    
    analysis = []
    for r in results:
        profit = float(r.profit or 0)
        revenue = float(r.revenue or 0)
        profit_margin = (profit / revenue * 100) if revenue > 0 else 0
        analysis.append({
            "category": r.category,
            "profit": profit,
            "profit_margin": profit_margin
        })
    return analysis
