from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def root_health():
    return {
        "message": "Sales & Revenue Analysis Dashboard API",
        "status": "running"
    }

@router.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
