# Sales & Revenue Analysis Dashboard API

## Overview
A production-ready FastAPI backend for the Sales & Revenue Analysis Dashboard. It processes uploaded CSV/Excel sales data, cleans it using Pandas, stores it in PostgreSQL via SQLAlchemy, and provides dynamic KPIs, trend analysis, and insights for a React frontend.

## Features
- **File Upload & Cleaning**: Validates and cleans CSV and Excel files.
- **Dynamic KPIs**: Calculates Total Revenue, Total Profit, Average Order Value, etc. dynamically via database queries.
- **Trend Analysis**: Monthly Revenue and Sales trend generation.
- **Insights**: Intelligent insights discovering the most profitable and highest revenue entities.
- **Pagination**: Optimized transactions API.

## Architecture
- **Framework**: FastAPI
- **Database**: PostgreSQL (via SQLAlchemy ORM)
- **Data Processing**: Pandas, NumPy
- **Server**: Uvicorn
- **Environment**: Pydantic Settings

## Local Setup
1. Create a virtual environment: `python -m venv venv`
2. Activate it: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
3. Install dependencies: `pip install -r requirements.txt`
4. Setup environment: Copy `.env.example` to `.env` and set `DATABASE_URL`. For pure local testing without Postgres, the app falls back to a SQLite database `sqlite:///./sales_dashboard.db`.
5. Run the server: `uvicorn app.main:app --reload`
6. View API docs: http://localhost:8000/docs

## Generating Sample Data
Run `python scripts/generate_data.py` to create `data/sample_sales_data.csv`.
Run `python scripts/load_sample_data.py` to clean and ingest this data.

## Testing
Run tests using: `pytest`

## Render Deployment
1. Connect this repo to Render.
2. Select the `render.yaml` configuration to automatically provision the web service and PostgreSQL database.
3. Ensure the Frontend (Vercel) URL is added to the `CORS_ORIGINS` environment variable.
