import os
import random
from datetime import datetime, timedelta
import csv

os.makedirs('data', exist_ok=True)
categories = ['Electronics', 'Furniture', 'Clothing', 'Office Supplies', 'Accessories']
regions = ['North', 'South', 'East', 'West']
products = {
    'Electronics': ['Laptop', 'Smartphone', 'Tablet', 'Monitor'],
    'Furniture': ['Desk', 'Chair', 'Bookshelf', 'Table'],
    'Clothing': ['T-Shirt', 'Jeans', 'Jacket', 'Sneakers'],
    'Office Supplies': ['Paper', 'Pens', 'Stapler', 'Folders'],
    'Accessories': ['Watch', 'Belt', 'Sunglasses', 'Wallet']
}
salespeople = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']

start_date = datetime(2026, 1, 1)

def generate_csv():
    filepath = 'data/sample_sales_data.csv'
    with open(filepath, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['Order_ID', 'Order_Date', 'Product', 'Category', 'Region', 'Quantity', 'Unit_Price', 'Cost', 'Salesperson'])
        for i in range(1, 1001):
            cat = random.choice(categories)
            prod = random.choice(products[cat])
            reg = random.choice(regions)
            qty = random.randint(1, 10)
            price = round(random.uniform(10.0, 500.0), 2)
            cost = round(price * random.uniform(0.5, 0.8) * qty, 2)
            date = (start_date + timedelta(days=random.randint(0, 180))).strftime('%Y-%m-%d')
            sp = random.choice(salespeople)
            writer.writerow([f'ORD{i:04d}', date, prod, cat, reg, qty, price, cost, sp])
    print(f"Generated {filepath} with 1000 records.")

if __name__ == "__main__":
    generate_csv()
