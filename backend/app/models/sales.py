from sqlalchemy import Column, Integer, String, Date, Numeric, DateTime, func
from app.database import Base

class Sales(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(String, index=True, nullable=False)
    order_date = Column(Date, index=True, nullable=False)
    product = Column(String, index=True, nullable=False)
    category = Column(String, index=True, nullable=False)
    region = Column(String, index=True, nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Numeric, nullable=False)
    cost = Column(Numeric, nullable=False)
    salesperson = Column(String, nullable=True)
    revenue = Column(Numeric, nullable=False)
    profit = Column(Numeric, nullable=False)
    profit_margin = Column(Numeric, nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)
