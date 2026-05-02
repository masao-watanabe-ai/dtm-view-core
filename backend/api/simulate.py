from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from backend.models.trace_model import Trace
from backend.services.simulation_service import simulate

router = APIRouter(prefix="/api", tags=["simulate"])


class SimulateRequest(BaseModel):
    trace_id: str
    signal_confidence: float = Field(ge=0.0, le=1.0)


@router.post("/simulate", response_model=Trace)
def run_simulation(req: SimulateRequest):
    result = simulate(req.trace_id, req.signal_confidence)
    if result is None:
        raise HTTPException(status_code=404, detail="Trace not found")
    return result
