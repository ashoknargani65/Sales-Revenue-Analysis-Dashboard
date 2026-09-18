from sqlalchemy.orm import Session
from sqlalchemy import func, distinct
from app.models.sales import Sales
from app.services.analytics_service import AnalyticsService

def get_dashboard_summary(db: Session, **filters):
    query = db.query(
        func.sum(Sales.revenue).label('total_revenue'),
        func.sum(Sales.quantity * Sales.unit_price).label('total_sales'),
        func.sum(Sales.profit).label('total_profit'),
        func.count(distinct(Sales.order_id)).label('total_orders')
    )
    query = AnalyticsService.apply_filters(query, **filters)
    result = query.one()
    
    total_revenue = result.total_revenue or 0
    total_sales = result.total_sales or 0
    total_profit = result.total_profit or 0
    total_orders = result.total_orders or 0
    
    average_order_value = (total_revenue / total_orders) if total_orders > 0 else 0
    profit_margin = (total_profit / total_revenue * 100) if total_revenue > 0 else 0

    return {
        "total_revenue": float(total_revenue),
        "total_sales": float(total_sales),
        "total_profit": float(total_profit),
        "total_orders": total_orders,
        "average_order_value": float(average_order_value),
        "profit_margin": float(profit_margin)
    }
