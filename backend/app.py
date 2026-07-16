from fastapi import FastAPI, HTTPException
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
# =====================================
# GET ALL INTERACTIONS
# =====================================

@app.get("/interactions", response_model=list[InteractionResponse])
def get_interactions():
    db = SessionLocal()
    try:
        return get_all_interactions(db)
    finally:
        db.close()


# =====================================
# GET SINGLE INTERACTION
# =====================================

@app.get("/interactions/{interaction_id}", response_model=InteractionResponse)
def get_single_interaction(interaction_id: int):
    db = SessionLocal()
    try:
        interaction = get_interaction(db, interaction_id)

        if interaction is None:
            raise HTTPException(status_code=404, detail="Interaction not found")

        return interaction

    finally:
        db.close()


# =====================================
# UPDATE INTERACTION
# =====================================

@app.put("/interactions/{interaction_id}", response_model=InteractionResponse)
def edit_interaction(interaction_id: int, data: dict):
    db = SessionLocal()
    try:
        interaction = update_interaction(db, interaction_id, data)

        if interaction is None:
            raise HTTPException(status_code=404, detail="Interaction not found")

        return interaction

    finally:
        db.close()


# =====================================
# DELETE INTERACTION
# =====================================

@app.delete("/interactions/{interaction_id}")
def remove_interaction(interaction_id: int):
    db = SessionLocal()
    try:
        deleted = delete_interaction(db, interaction_id)

        if not deleted:
            raise HTTPException(status_code=404, detail="Interaction not found")

        return {"message": "Interaction deleted successfully"}

    finally:
        db.close()