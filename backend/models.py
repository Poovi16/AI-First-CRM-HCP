from pydantic import BaseModel
from typing import Optional


class Interaction(BaseModel):
    hcpName: str
    date: str
    product: str
    sentiment: str
    brochureShared: bool
    summary: str
    followUp: str


from typing import Optional

class ChatRequest(BaseModel):
    message: str
    interaction_id: Optional[int] = None


class ChatResponse(BaseModel):
    hcpName: str
    date: str
    product: str
    sentiment: str
    brochureShared: bool
    summary: str
    followUp: str