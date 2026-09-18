from sqlalchemy.orm import Session
from app.analytics.categories import get_category_analysis
from app.analytics.regions import get_region_analysis
from app.analytics.products import get_top_products
from app.analytics.kpis import get_dashboard_summary

def generate_insights(db: Session, **filters):
    insights = []
    
    # 1. Highest revenue category
    categories = get_category_analysis(db, **filters)
    if categories:
        top_cat = max(categories, key=lambda x: x['revenue'])
        insights.append({
            "type": "category",
            "title": "Top Revenue Category",
            "description": f"{top_cat['category']} generated the highest revenue.",
            "value": top_cat['revenue']
        })
        
        # 2. Highest profit margin category
        top_margin_cat = max(categories, key=lambda x: (x['profit'] / x['revenue']) if x['revenue'] > 0 else 0)
        margin = (top_margin_cat['profit'] / top_margin_cat['revenue'] * 100) if top_margin_cat['revenue'] > 0 else 0
        insights.append({
            "type": "category_profitability",
            "title": "Most Profitable Category",
            "description": f"{top_margin_cat['category']} has the highest profit margin.",
            "value": margin
        })
        
    # 3. Highest revenue region
    regions = get_region_analysis(db, **filters)
    if regions:
        top_region = max(regions, key=lambda x: x['revenue'])
        insights.append({
            "type": "region",
            "title": "Top Revenue Region",
            "description": f"{top_region['region']} generated the highest revenue.",
            "value": top_region['revenue']
        })
        
    # 4. Top product contribution
    top_products = get_top_products(db, limit=10, **filters)
    summary = get_dashboard_summary(db, **filters)
    if top_products and summary['total_revenue'] > 0:
        top_10_revenue = sum(p['revenue'] for p in top_products)
        contribution = (top_10_revenue / summary['total_revenue']) * 100
        insights.append({
            "type": "product_concentration",
            "title": "Top 10 Products Contribution",
            "description": "Top 10 products account for a significant portion of total revenue.",
            "value": contribution
        })
        
        # Most profitable product
        most_profitable = max(top_products, key=lambda x: x['profit'])
        insights.append({
            "type": "product_profitability",
            "title": "Most Profitable Product",
            "description": f"{most_profitable['product']} generated the highest profit.",
            "value": most_profitable['profit']
        })

    return insights
