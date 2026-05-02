from pydantic import BaseModel, Field
import uuid


class Boundary(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    rules: list[str]
    active: bool = True
