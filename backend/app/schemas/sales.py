from pydantic import BaseModel
from datetime import date
from typing import List, Optional

class Transaction(BaseModel):
    order_id: str
    date: date
    product: str
    category: str
    region: str
    quantity: int
    revenue: float
    profit: float

    class Config:
        from_attributes = True

class PaginationMetadata(BaseModel):
    page: int
    limit: int
    total: int
    total_pages: int

class TransactionResponse(BaseModel):
    data: List[Transaction]
    pagination: PaginationMetadata

class ProductAnalysis(BaseModel):
    rank: int
    product: str
    category: str
    units_sold: int
    revenue: float
    profit: float
    profit_margin: float
