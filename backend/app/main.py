from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings

# Import routes
from app.routes import health, upload, dashboard, transactions, products, filters, insights

app = FastAPI(
    title="Sales & Revenue Analysis Dashboard API",
    description="Backend API for Sales & Revenue Analysis Dashboard",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers here
app.include_router(health.router)
app.include_router(upload.router, prefix="/upload", tags=["Upload"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(transactions.router, prefix="/transactions", tags=["Transactions"])
app.include_router(products.router, prefix="/products", tags=["Products"])
app.include_router(filters.router, prefix="/filters", tags=["Filters"])
app.include_router(insights.router, prefix="/insights", tags=["Insights"])

@app.on_event("startup")
async def startup_event():
    # Database table initialization (create if not exist)
    from app.database import engine, Base
    import app.models.sales # Ensure models are loaded
    # Only create tables, never drop them during startup
    Base.metadata.create_all(bind=engine)
