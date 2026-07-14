from pydantic import BaseModel
from typing import Optional

class InteractionResponse(BaseModel):
    id: int

    hcp_name: str

    interaction_type: Optional[str] = None
    interaction_date: Optional[str] = None
    interaction_time: Optional[str] = None
    attendees: Optional[str] = None

    topics_discussed: Optional[str] = None
    products_discussed: Optional[str] = None
    product: Optional[str] = None

    materials_shared: Optional[str] = None
    samples_distributed: Optional[str] = None

    sentiment: Optional[str] = None
    summary: Optional[str] = None

    brochure_shared: bool

    follow_up_required: bool
    follow_up_date: Optional[str] = None

    outcomes: Optional[str] = None

    action_items: Optional[str] = None
    next_steps: Optional[str] = None
    remarks: Optional[str] = None

    class Config:
        from_attributes = True