from pydantic import BaseModel
from typing import List

class DashboardSummary(BaseModel):
    total_revenue: float
    total_sales: float
    total_profit: float
    total_orders: int
    average_order_value: float
    profit_margin: float

class RevenueTrend(BaseModel):
    month: str
    revenue: float

class SalesTrend(BaseModel):
    month: str
    sales: float

class CategoryAnalysis(BaseModel):
    category: str
    revenue: float
    sales: float
    profit: float

class RegionAnalysis(BaseModel):
    region: str
    revenue: float
    sales: float
    profit: float

class TopProduct(BaseModel):
    product: str
    revenue: float
    profit: float
    quantity: int

class ProfitAnalysis(BaseModel):
    category: str
    profit: float
    profit_margin: float
