from datetime import datetime
from pydantic import BaseModel, Field
import uuid


class Decision(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    signal_id: str
    action: str
    reason: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
