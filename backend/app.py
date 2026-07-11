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
from db_models import Base

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
    allow_origins=["*"],
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

        # -----------------------------
        # CREATE NEW INTERACTION
        # -----------------------------

        if request.interaction_id is None:


            result = log_interaction.invoke(
                {
                    "text": request.message
                }
            )


            if isinstance(result, dict):
                data = result

            else:
                data = json.loads(result)



            if "error" in data:
                return data



            saved = create_interaction(
                db,
                data
            )


            return {

                "message": "Interaction Saved Successfully",

                "id": saved.id,

                "data": data

            }



        # -----------------------------
        # UPDATE EXISTING
        # -----------------------------


        existing = get_interaction(
            db,
            request.interaction_id
        )


        if existing is None:

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

{json.dumps(existing_data,indent=2)}


User Update:

{request.message}

"""


        result = edit_interaction_ai.invoke(
            {
                "text": prompt
            }
        )



        if isinstance(result,dict):

            updated_fields=result

        else:

            updated_fields=json.loads(result)



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


        return {

            "message":"Interaction Updated Successfully",

            "id":latest.id,

            "data":{

                "hcpName":latest.hcp_name,

                "interactionType":latest.interaction_type,

                "date":str(latest.interaction_date or ""),

                "time":latest.interaction_time,

                "attendees":latest.attendees,

                "topicsDiscussed":latest.topics_discussed,

                "productsDiscussed":latest.products_discussed,

                "product":latest.product,

                "materialsShared":latest.materials_shared,

                "sentiment":latest.sentiment,

                "summary":latest.summary,

                "brochureShared":latest.brochure_shared,

                "followUpRequired":latest.follow_up_required,

                "followUpDate":str(latest.follow_up_date or ""),

                "actionItems":latest.action_items,

                "nextSteps":latest.next_steps,

                "remarks":latest.remarks

            }

        }



    except Exception as e:


        return {
            "error":str(e)
        }



    finally:

        db.close()




# =====================================
# GET ALL INTERACTIONS
# =====================================

@app.get(
    "/interactions",
    response_model=list[InteractionResponse]
)
def get_interactions():


    db=SessionLocal()

    try:

        return get_all_interactions(db)

    finally:

        db.close()




# =====================================
# GET SINGLE
# =====================================

@app.get(
    "/interaction/{interaction_id}"
)
def get_single_interaction(
        interaction_id:int
):


    db=SessionLocal()


    try:

        interaction=get_interaction(
            db,
            interaction_id
        )


        if interaction is None:

            return {
                "error":"Interaction not found"
            }


        return interaction



    finally:

        db.close()




# =====================================
# MANUAL UPDATE
# =====================================

@app.put(
    "/interaction/{interaction_id}"
)
def update_single_interaction(
        interaction_id:int,
        data:dict
):


    db=SessionLocal()


    try:


        updated=update_interaction(
            db,
            interaction_id,
            data
        )


        if updated is None:

            return {
                "error":"Interaction not found"
            }


        return {

            "message":"Interaction Updated Successfully",

            "data":updated

        }



    finally:

        db.close()




# =====================================
# DELETE
# =====================================

@app.delete(
    "/interaction/{interaction_id}"
)
def delete_single_interaction(
        interaction_id:int
):


    db=SessionLocal()


    try:


        deleted=delete_interaction(
            db,
            interaction_id
        )


        if not deleted:

            return {
                "error":"Interaction not found"
            }



        return {

            "message":"Interaction Deleted Successfully"

        }



    finally:

        db.close()