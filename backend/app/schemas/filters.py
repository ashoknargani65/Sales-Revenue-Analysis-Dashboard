from pydantic import BaseModel
from typing import List

class DateRange(BaseModel):
    min: str
    max: str

class FilterOptions(BaseModel):
    categories: List[str]
    regions: List[str]
    products: List[str]
    salespeople: List[str]
    date_range: DateRange
