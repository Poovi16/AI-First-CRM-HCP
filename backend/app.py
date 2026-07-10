from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

from models import ChatRequest
from schemas import InteractionResponse
from tools import log_interaction

from database import SessionLocal, engine
from db_models import Base
from crud import (
    create_interaction,
    get_all_interactions,
    get_interaction,
    update_interaction,
    delete_interaction,
)

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI CRM HCP API",
    description="AI-powered CRM Backend for Healthcare Professional (HCP) Interaction Management",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get(
    "/",
    tags=["Home"],
    summary="Backend Status"
)
def home():
    return {
        "message": "AI CRM Backend Running 🚀"
    }


# ===============================
# CHAT API
# ===============================

@app.post(
    "/chat",
    tags=["AI Assistant"],
    summary="Extract and Save HCP Interaction"
)
async def chat(request: ChatRequest):

    db = SessionLocal()

    try:

        result = log_interaction.invoke(
            {
                "text": request.message
            }
        )

        data = json.loads(result)

        if "error" in data:
            return data

        saved = create_interaction(db, data)

        return {
            "message": "Interaction Saved Successfully",
            "id": saved.id,
            "data": data
        }

    except Exception as e:

        return {
            "error": str(e)
        }

    finally:
        db.close()


# ===============================
# GET ALL
# ===============================

@app.get(
    "/interactions",
    response_model=list[InteractionResponse],
    tags=["Interactions"],
    summary="Get All Interactions"
)
def get_interactions():

    db = SessionLocal()

    try:

        interactions = get_all_interactions(db)

        return interactions

    finally:

        db.close()


# ===============================
# GET BY ID
# ===============================

@app.get(
    "/interaction/{interaction_id}",
    response_model=InteractionResponse,
    tags=["Interactions"],
    summary="Get Interaction By ID"
)
def get_one_interaction(interaction_id: int):

    db = SessionLocal()

    try:

        interaction = get_interaction(db, interaction_id)

        if interaction is None:

            return {
                "message": "Interaction Not Found"
            }

        return interaction

    finally:

        db.close()


# ===============================
# UPDATE
# ===============================

@app.put(
    "/interaction/{interaction_id}",
    tags=["Interactions"],
    summary="Update Interaction"
)
def edit_interaction(interaction_id: int, data: dict):

    db = SessionLocal()

    try:

        interaction = update_interaction(
            db,
            interaction_id,
            data
        )

        if interaction is None:

            return {
                "message": "Interaction Not Found"
            }

        return {
            "message": "Interaction Updated Successfully",
            "data": interaction
        }

    finally:

        db.close()


# ===============================
# DELETE
# ===============================

@app.delete(
    "/interaction/{interaction_id}",
    tags=["Interactions"],
    summary="Delete Interaction"
)
def remove_interaction(interaction_id: int):

    db = SessionLocal()

    try:

        deleted = delete_interaction(
            db,
            interaction_id
        )

        if not deleted:

            return {
                "message": "Interaction Not Found"
            }

        return {
            "message": "Interaction Deleted Successfully"
        }

    finally:

        db.close()