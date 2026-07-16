from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

from models import ChatRequest
from schemas import InteractionResponse

from tools import (
    log_interaction,
    edit_interaction as edit_interaction_ai
)

from database import SessionLocal, engine
from database import Base
from db_models import Interaction
Base.metadata.create_all(bind=engine)

from crud import (
    create_interaction,
    get_all_interactions,
    get_interaction,
    update_interaction,
    delete_interaction,
)


# =====================================
# CREATE DATABASE TABLES
# =====================================

Base.metadata.create_all(bind=engine)


# =====================================
# FASTAPI APP
# =====================================

app = FastAPI(
    title="AI CRM HCP API",
    description="AI powered CRM Backend",
    version="1.0.0"
)


# =====================================
# CORS
# =====================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",  "https://ai-first-crm-hcp-six.vercel.app",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================
# HOME
# =====================================

@app.get("/")
def home():

    return {
        "message": "AI CRM Backend Running 🚀"
    }



# =====================================
# CHAT API
# =====================================
@app.post("/chat")
async def chat(request: ChatRequest):

    db = SessionLocal()

    try:

        print("========== NEW CHAT REQUEST ==========")
        print("Request:", request)

        # -----------------------------
        # CREATE NEW INTERACTION
        # -----------------------------
        if request.interaction_id is None:

            print("Creating new interaction...")
            print("Calling log_interaction.invoke()")

            result = log_interaction.invoke(
                {
                    "text": request.message
                }
            )

            print("LLM Raw Result:", result)

            if isinstance(result, dict):
                data = result
            else:
                data = json.loads(result)

            print("Parsed Data:", data)

            if "error" in data:
                print("LLM Returned Error:", data)
                return data

            print("Saving interaction to database...")

            saved = create_interaction(db, data)

            print("Saved Successfully. ID =", saved.id)

            return {
                "message": "Interaction Saved Successfully",
                "id": saved.id,
                "data": {
                    **data,
                    "id": saved.id,
                },
            }

        # -----------------------------
        # UPDATE EXISTING
        # -----------------------------
        print("Updating interaction:", request.interaction_id)

        existing = get_interaction(
            db,
            request.interaction_id
        )

        if existing is None:
            print("Interaction not found.")
            return {
                "error": "Interaction not found."
            }

        existing_data = {
            "hcpName": existing.hcp_name,
            "interactionType": existing.interaction_type,
            "date": str(existing.interaction_date or ""),
            "time": existing.interaction_time,
            "attendees": existing.attendees,
            "topicsDiscussed": existing.topics_discussed,
            "productsDiscussed": existing.products_discussed,
            "product": existing.product,
            "materialsShared": existing.materials_shared,
            "sentiment": existing.sentiment,
            "summary": existing.summary,
            "brochureShared": existing.brochure_shared,
            "followUpRequired": existing.follow_up_required,
            "followUpDate": str(existing.follow_up_date or ""),
            "actionItems": existing.action_items,
            "nextSteps": existing.next_steps,
            "remarks": existing.remarks
        }

        prompt = f"""
Existing Interaction:

{json.dumps(existing_data, indent=2)}

User Update:

{request.message}
"""

        print("Calling edit_interaction.invoke()")

        result = edit_interaction_ai.invoke(
            {
                "text": prompt
            }
        )

        print("LLM Update Result:", result)

        if isinstance(result, dict):
            updated_fields = result
        else:
            updated_fields = json.loads(result)

        print("Parsed Update:", updated_fields)

        if "error" in updated_fields:
            return updated_fields

        update_interaction(
            db,
            request.interaction_id,
            updated_fields
        )

        latest = get_interaction(
            db,
            request.interaction_id
        )

        print("Update Successful")

        return {
            "message": "Interaction Updated Successfully",
            "id": latest.id,
            "data": {
                "hcpName": latest.hcp_name,
                "interactionType": latest.interaction_type,
                "date": str(latest.interaction_date or ""),
                "time": latest.interaction_time,
                "attendees": latest.attendees,
                "topicsDiscussed": latest.topics_discussed,
                "productsDiscussed": latest.products_discussed,
                "product": latest.product,
                "materialsShared": latest.materials_shared,
                "samplesDistributed": latest.samples_distributed,
                "sentiment": latest.sentiment,
                "summary": latest.summary,
                "brochureShared": latest.brochure_shared,
                "followUpRequired": latest.follow_up_required,
                "followUpDate": str(latest.follow_up_date or ""),
                "outcomes": latest.outcomes,
                "actionItems": latest.action_items,
                "nextSteps": latest.next_steps,
                "remarks": latest.remarks
            }
        }

    except Exception as e:
        import traceback

        print("========== CHAT ERROR ==========")
        print(str(e))
        traceback.print_exc()

        return {
            "error": str(e)
        }

    finally:
        db.close()