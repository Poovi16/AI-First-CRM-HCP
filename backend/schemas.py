from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional


class InteractionResponse(BaseModel):
    id: int

    # HCP Details
    hcp_name: str

    # Interaction Details
    interaction_type: Optional[str] = None
    interaction_date: date
    interaction_time: Optional[str] = None
    attendees: Optional[str] = None

    # Discussion
    topics_discussed: Optional[str] = None
    products_discussed: Optional[str] = None
    product: Optional[str] = None
    materials_shared: Optional[str] = None

    # AI Analysis
    sentiment: Optional[str] = None
    summary: Optional[str] = None

    # Materials
    brochure_shared: bool = False

    # Follow-up
    follow_up_required: bool = False
    follow_up_date: Optional[date] = None

    # CRM Notes
    action_items: Optional[str] = None
    next_steps: Optional[str] = None
    remarks: Optional[str] = None

    created_at: datetime

    class Config:
        from_attributes = True