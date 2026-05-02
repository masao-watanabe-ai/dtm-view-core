from typing import Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.services.trace_service import compare_traces

router = APIRouter(prefix="/api", tags=["compare"])


class CompareRequest(BaseModel):
    base_trace_id: str
    target_trace_id: str


class DiffRow(BaseModel):
    field: str
    base: Optional[str] = None
    target: Optional[str] = None
    changed: bool


class CompareResult(BaseModel):
    base_id: str
    target_id: str
    decisions: list[DiffRow]
    boundary: list[DiffRow]
    human: list[DiffRow]


@router.post("/compare", response_model=CompareResult)
def compare(req: CompareRequest):
    result = compare_traces(req.base_trace_id, req.target_trace_id)
    if result is None:
        raise HTTPException(status_code=404, detail="One or both traces not found")
    return result
