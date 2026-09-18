def test_get_dashboard_summary_empty(client):
    response = client.get("/dashboard/summary")
    assert response.status_code == 200
    data = response.json()
    assert data["total_revenue"] == 0
    assert data["total_orders"] == 0
