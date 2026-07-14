from sqlalchemy.orm import Session
from db_models import Interaction


# ---------------------------------------
# Create Interaction
# ---------------------------------------
def create_interaction(db: Session, data: dict):

    interaction = Interaction(

        # HCP
        hcp_name=data.get("hcpName"),

        # Interaction
        interaction_type=data.get("interactionType"),
        interaction_date=data.get("date"),
        interaction_time=data.get("time"),
        attendees=data.get("attendees"),

        # Discussion
        topics_discussed=data.get("topicsDiscussed"),
        products_discussed=data.get("productsDiscussed"),
        product=data.get("product"),
        materials_shared=data.get("materialsShared"),

        # AI
        sentiment=data.get("sentiment"),
        summary=data.get("summary"),

        # Brochure
        brochure_shared=data.get("brochureShared", False),

        # Follow-up
        follow_up_required=data.get("followUpRequired", False),
        follow_up_date=data.get("followUpDate") or None,

        # CRM
        outcomes=data.get("outcomes"),
        action_items=data.get("actionItems"),
        next_steps=data.get("nextSteps"),
        remarks=data.get("remarks"),
        samples_distributed=data.get("samplesDistributed"),
    )

    db.add(interaction)
    db.commit()
    db.refresh(interaction)

    return interaction


# ---------------------------------------
# Get All
# ---------------------------------------
def get_all_interactions(db: Session):

    return db.query(Interaction).all()


# ---------------------------------------
# Get One
# ---------------------------------------
def get_interaction(db: Session, interaction_id: int):

    return (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )


# ---------------------------------------
# Update
# ---------------------------------------
def update_interaction(
    db: Session,
    interaction_id: int,
    data: dict,
):

    interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )

    if not interaction:
        return None

    field_mapping = {
        
        "hcpName": "hcp_name",
        "interactionType": "interaction_type",
        "date": "interaction_date",
        "time": "interaction_time",
        "attendees": "attendees",

        "topicsDiscussed": "topics_discussed",
        "productsDiscussed": "products_discussed",
        "product": "product",

        "materialsShared": "materials_shared",
        "samplesDistributed": "samples_distributed",

        "sentiment": "sentiment",
        "summary": "summary",

        "brochureShared": "brochure_shared",

        "followUpRequired": "follow_up_required",
        "followUpDate": "follow_up_date",

        "outcomes": "outcomes",

        "actionItems": "action_items",
        "nextSteps": "next_steps",
        "remarks": "remarks",
    }

    for key, db_field in field_mapping.items():
        if key in data:
            setattr(interaction, db_field, data[key])

    db.commit()
    db.refresh(interaction)

    return interaction


# ---------------------------------------
# Delete
# ---------------------------------------
def delete_interaction(
    db: Session,
    interaction_id: int,
):

    interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )

    if not interaction:
        return False

    db.delete(interaction)
    db.commit()

    return True