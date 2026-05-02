from datetime import datetime
from pydantic import BaseModel, Field
import uuid


class Signal(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event_id: str
    type: str
    value: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
