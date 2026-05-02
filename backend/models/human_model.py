from datetime import datetime
from pydantic import BaseModel, Field
import uuid


class Human(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    action: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
