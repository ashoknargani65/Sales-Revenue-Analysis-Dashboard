def test_root_health(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "message": "Sales & Revenue Analysis Dashboard API",
        "status": "running"
    }

def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {
        "status": "healthy"
    }
