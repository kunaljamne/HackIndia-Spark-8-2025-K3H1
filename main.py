from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routes_model import get_indian_airports, suggest_routes
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class RouteRequest(BaseModel):
    source: str
    destination: str

@app.get("/airports")
def get_airports():
    return get_indian_airports()

@app.post("/suggestions")
def get_suggestions(req: RouteRequest):
    try:
        routes = suggest_routes(req.source.upper(), req.destination.upper())
        return {"routes": routes}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))