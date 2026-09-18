from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.insights import Insight
from app.analytics.insights import generate_insights
from app.routes.dashboard import filter_params

router = APIRouter()

@router.get("", response_model=List[Insight])
def get_insights(db: Session = Depends(get_db), filters: dict = Depends(filter_params)):
    return generate_insights(db, **filters)
