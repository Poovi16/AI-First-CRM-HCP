import json
from datetime import datetime, timedelta

from langchain_core.tools import tool

from llm import llm
from prompt import EXTRACT_PROMPT, UPDATE_PROMPT


# =====================================================
# Utility Functions
# =====================================================

def clean_json(content: str):
    """
    Remove markdown formatting and convert JSON string
    into Python dictionary.
    """

    if not content:
        return {}

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
    Convert Today / Yesterday / Tomorrow
    into YYYY-MM-DD format.
    """

    if not date_value:
        return ""

    today = datetime.today()

    value = str(date_value).strip().lower()

    if value == "today":
        return today.strftime("%Y-%m-%d")

    if value == "yesterday":
        return (
            today - timedelta(days=1)
        ).strftime("%Y-%m-%d")

    if value == "tomorrow":
        return (
            today + timedelta(days=1)
        ).strftime("%Y-%m-%d")

    try:
        datetime.strptime(date_value, "%Y-%m-%d")
        return date_value

    except Exception:
        return date_value


# =====================================================
# Log Interaction
# =====================================================

@tool
def log_interaction(text: str) -> str:
    """
    Extract HCP interaction details from natural language
    and return structured JSON.
    """

    prompt = f"""
{EXTRACT_PROMPT}

Conversation:

{text}
"""

    try:
        response = llm.invoke(prompt)

        print("\n===== LLM RAW RESPONSE =====")
        print(response.content)

        data = clean_json(response.content)

        # ==========================================
        # Generate Outcome if LLM misses it
        # ==========================================

        sentiment = str(
            data.get("sentiment", "Neutral")
        ).strip().lower()

        topics = str(
            data.get("topicsDiscussed", "")
        ).strip()

        product = str(
            data.get("product", "")
        ).strip()

        if not data.get("outcomes"):

            if sentiment == "positive":
                data["outcomes"] = (
                    f"Doctor showed positive interest in "
                    f"{product or 'the discussed product'} "
                    f"after discussing "
                    f"{topics or 'the proposed therapy'}."
                )

            elif sentiment == "neutral":
                data["outcomes"] = (
                    "Discussion completed successfully. "
                    "Further follow-up is required."
                )

            elif sentiment == "negative":
                data["outcomes"] = (
                    "Doctor was not convinced and requested "
                    "additional information before considering "
                    "the product."
                )

            else:
                data["outcomes"] = (
                    "Interaction completed successfully."
                )

        print("\n===== PARSED JSON =====")
        print(json.dumps(data, indent=2))

        # Normalize Date
        data["date"] = normalize_date(
            data.get("date", "")
        )

        # ==========================================
        # Enterprise CRM Default Fields
        # ==========================================

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
            "samplesDistributed": "",

            "sentiment": "",
            "brochureShared": False,

            "followUpRequired": False,
            "followUpDate": "",

            "outcomes": "",
            "actionItems": "",
            "remarks": "",
            "summary": ""
        }

        for key, value in defaults.items():
            data.setdefault(key, value)

        data["brochureShared"] = bool(
            data.get("brochureShared", False)
        )

        data["followUpRequired"] = bool(
            data.get("followUpRequired", False)
        )

        print("\n===== FINAL JSON =====")
        print(json.dumps(data, indent=2))

        return json.dumps(
            data,
            ensure_ascii=False,
            indent=2
        )

    except json.JSONDecodeError:
        return json.dumps(
            {
                "error": "Invalid JSON returned by LLM."
            },
            ensure_ascii=False
        )

    except Exception as e:
        print("LOG INTERACTION ERROR:", str(e))

        return json.dumps(
            {
                "error": str(e)
            },
            ensure_ascii=False
        )
        
        # =====================================================
# Edit Interaction
# =====================================================

@tool
def edit_interaction(text: str) -> str:
    """
    Update an existing HCP interaction.
    """

    prompt = f"""
{UPDATE_PROMPT}

{text}
"""

    try:
        response = llm.invoke(prompt)

        print("\n===== UPDATE LLM RESPONSE =====")
        print(response.content)

        data = clean_json(response.content)

        # Keep date normalized if present
        if data.get("date"):
            data["date"] = normalize_date(data["date"])

        return json.dumps(
            data,
            ensure_ascii=False,
            indent=2
        )

    except json.JSONDecodeError:
        return json.dumps(
            {
                "error": "Invalid JSON returned by LLM."
            },
            ensure_ascii=False,
            indent=2
        )

    except Exception as e:
        print("EDIT INTERACTION ERROR:", str(e))

        return json.dumps(
            {
                "error": str(e)
            },
            ensure_ascii=False,
            indent=2
        )


# =====================================================
# Get HCP Profile
# =====================================================

@tool
def get_hcp_profile(name: str) -> str:
    """
    Fetch HCP profile.
    """

    try:

        profile = {
            "doctorName": name,
            "speciality": "Cardiology",
            "hospital": "",
            "city": "",
            "lastInteraction": "",
            "preferredProducts": [],
            "notes": "",
            "status": "Active"
        }

        return json.dumps(
            profile,
            ensure_ascii=False,
            indent=2
        )

    except Exception as e:

        return json.dumps(
            {
                "error": str(e)
            },
            ensure_ascii=False,
            indent=2
        )
        
        # ==========================================
# Tool 4: Schedule Follow-up
# ==========================================

@tool
def schedule_followup(
    hcp_name: str,
    followup_date: str,
    purpose: str
):
    """
    Schedule a follow-up meeting/task with HCP.
    """

    try:
        data = {
            "hcp_name": hcp_name,
            "followup_date": normalize_date(followup_date),
            "purpose": purpose,
            "status": "scheduled",
            "created_at": datetime.now().isoformat()
        }

        # Later this can be replaced with DB insert
        print("FOLLOWUP CREATED:", data)

        return {
            "success": True,
            "message": f"Follow-up scheduled with {hcp_name}",
            "data": data
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


# ==========================================
# Tool 5: Generate Summary
# ==========================================

@tool
def generate_summary(
    hcp_name: str,
    interaction_details: str
):
    """
    Generate a concise interaction summary.
    """

    try:

        prompt = f"""
        Create a professional CRM interaction summary.

        HCP Name:
        {hcp_name}

        Interaction Details:
        {interaction_details}

        Give summary with:
        - Key discussion points
        - Important observations
        - Next action items
        """

        response = llm.invoke(prompt)

        summary = response.content

        return {
            "success": True,
            "hcp_name": hcp_name,
            "summary": summary
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }