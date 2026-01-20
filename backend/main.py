from fastapi import FastAPI

app = FastAPI()

@app.get("/order/{order_id}")
def get_order_status(order_id: int):
    return {
        "order_id": order_id,
        "status": "Shipped",
        "expected_delivery": "Tomorrow"
    }

@app.post("/create-ticket")
def create_ticket(issue: str):
    return {
        "ticket_id": "TCK12345",
        "status": "Created",
        "message": "Support ticket created successfully"
    }
