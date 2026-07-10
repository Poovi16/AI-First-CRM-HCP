import json
from datetime import datetime, timedelta

from langchain_core.tools import tool

from agent import llm
from prompt import SYSTEM_PROMPT


# -----------------------------
# Utility Functions
# -----------------------------
def clean_json(content: str):
    """Clean markdown and convert JSON string to Python object."""
    content = content.strip()

    if content.startswith("```"):
        content = (
            content.replace("```json", "")
            .replace("```", "")
            .strip()
        )

    return json.loads(content)


def normalize_date(date_value: str) -> str:
    """
    Convert Today / Yesterday / Tomorrow into YYYY-MM-DD.
    """

    if not date_value:
        return ""

    today = datetime.today()

    value = date_value.strip().lower()

    if value == "today":
        return today.strftime("%Y-%m-%d")

    if value == "yesterday":
        return (today - timedelta(days=1)).strftime("%Y-%m-%d")

    if value == "tomorrow":
        return (today + timedelta(days=1)).strftime("%Y-%m-%d")

    try:
        datetime.strptime(date_value, "%Y-%m-%d")
        return date_value
    except Exception:
        return ""


# -----------------------------
# Log Interaction
# -----------------------------
@tool
def log_interaction(text: str) -> str:
    """
    Extract HCP interaction details from natural language
    and return structured JSON.
    """

    prompt = f"""
{SYSTEM_PROMPT}

Conversation:

{text}
"""

    try:

        response = llm.invoke(prompt)

        data = clean_json(response.content)

        # Normalize Date
        data["date"] = normalize_date(
            data.get("date", "")
        )

        # Default Fields
        defaults = {
            "hcpName": "",
            "interactionType": "",
            "date": "",
            "time": "",
            "attendees": "",
            "topicsDiscussed": "",
            "productsDiscussed": "",
            "product": "",
            "materialsShared": "",
            "sentiment": "",
            "summary": "",
            "brochureShared": False,
            "followUp": "",
            "followUpRequired": False,
            "followUpDate": "",
            "actionItems": "",
            "nextSteps": "",
            "remarks": "",
        }

        for key, value in defaults.items():
            data.setdefault(key, value)

        return json.dumps(data)

    except Exception as e:

        return json.dumps(
            {
                "error": str(e)
            }
        )


# -----------------------------
# Edit Interaction
# -----------------------------
@tool
def edit_interaction(text: str) -> str:
    """
    Edit an existing HCP interaction.
    """

    return json.dumps(
        {
            "status": "Edit Interaction Tool Triggered",
            "input": text,
        }
    )


# -----------------------------
# HCP Profile
# -----------------------------
@tool
def get_hcp_profile(name: str) -> str:
    """
    Fetch doctor profile.
    """

    return json.dumps(
        {
            "doctor": name,
            "speciality": "Cardiology",
        }
    )


# -----------------------------
# Schedule Follow Up
# -----------------------------
@tool
def schedule_followup(text: str) -> str:
    """
    Schedule follow-up.
    """

    return json.dumps(
        {
            "status": "Follow-up Scheduled",
            "followUp": text,
        }
    )


# -----------------------------
# Generate Summary
# -----------------------------
@tool
def generate_summary(text: str) -> str:
    """
    Generate CRM Summary.
    """

    prompt = f"""
Summarize the following HCP interaction professionally in 2-3 sentences.

{text}
"""

    try:

        response = llm.invoke(prompt)

        return json.dumps(
            {
                "summary": response.content.strip()
            }
        )

    except Exception as e:

        return json.dumps(
            {
                "error": str(e)
            }
        )