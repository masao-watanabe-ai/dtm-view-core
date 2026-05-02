from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional
import uuid

from backend.models.event_model import Event
from backend.models.signal_model import Signal
from backend.models.decision_model import Decision
from backend.models.boundary_model import Boundary
from backend.models.human_model import Human
from backend.models.log_model import Log


class Trace(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event: Event
    signals: list[Signal] = Field(default_factory=list)
    decisions: list[Decision] = Field(default_factory=list)
    boundary: Boundary
    human: Optional[Human] = None
    logs: list[Log] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.utcnow)
