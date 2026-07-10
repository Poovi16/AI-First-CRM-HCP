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


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    hcpName: str
    date: str
    product: str
    sentiment: str
    brochureShared: bool
    summary: str
    followUp: str