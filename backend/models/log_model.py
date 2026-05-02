from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field
import uuid


class LogLevel(str, Enum):
    info = "info"
    warn = "warn"
    error = "error"


class Log(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    trace_id: str
    level: LogLevel = LogLevel.info
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
