from fastapi import APIRouter, HTTPException
from backend.models.trace_model import Trace
from backend.services.trace_service import get_trace, list_traces

router = APIRouter(prefix="/api", tags=["trace"])


@router.get("/traces", response_model=list[Trace])
def get_traces():
    return list_traces()


@router.get("/trace/{trace_id}", response_model=Trace)
def get_trace_by_id(trace_id: str):
    trace = get_trace(trace_id)
    if trace is None:
        raise HTTPException(status_code=404, detail="Trace not found")
    return trace
