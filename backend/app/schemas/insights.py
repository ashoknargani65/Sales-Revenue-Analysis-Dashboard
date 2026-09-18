from pydantic import BaseModel
from typing import List

class Insight(BaseModel):
    type: str
    title: str
    description: str
    value: float
