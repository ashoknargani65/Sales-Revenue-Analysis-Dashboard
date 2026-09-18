from sqlalchemy.orm import Query
from app.models.sales import Sales
from typing import Optional

class AnalyticsService:
    @staticmethod
    def apply_filters(
        query: Query,
        start_date: Optional[str] = None,
        end_date: Optional[str] = None,
        region: Optional[str] = None,
        category: Optional[str] = None,
        product: Optional[str] = None,
        salesperson: Optional[str] = None
    ) -> Query:
        if start_date:
            query = query.filter(Sales.order_date >= start_date)
        if end_date:
            query = query.filter(Sales.order_date <= end_date)
        if region:
            query = query.filter(Sales.region == region)
        if category:
            query = query.filter(Sales.category == category)
        if product:
            query = query.filter(Sales.product == product)
        if salesperson:
            query = query.filter(Sales.salesperson == salesperson)
        return query
