from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    Text,
    Date,
    TIMESTAMP,
)

from sqlalchemy.sql import func

from database import Base


class Interaction(Base):

    __tablename__ = "interactions"

    # Primary Key
    id = Column(Integer, primary_key=True, index=True)

    # HCP Details
    hcp_name = Column(String(255), nullable=False)

    # Interaction Details
    interaction_type = Column(String(100))
    interaction_date = Column(Date)
    interaction_time = Column(String(50))
    attendees = Column(Text)

    # Discussion Details
    topics_discussed = Column(Text)
    products_discussed = Column(Text)
    product = Column(String(255))
    materials_shared = Column(Text)

    # AI Analysis
    sentiment = Column(String(100))
    summary = Column(Text)

    # Materials
    brochure_shared = Column(Boolean, default=False)

    # Follow-up
    follow_up_required = Column(Boolean, default=False)
    follow_up_date = Column(Date)

    # CRM Notes
    outcomes = Column(Text)
    action_items = Column(Text)
    next_steps = Column(Text)
    remarks = Column(Text)
    samples_distributed = Column(Text)
    

    # Timestamp
    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )