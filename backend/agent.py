import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langgraph.prebuilt import create_react_agent

from tools import (
    log_interaction,
    edit_interaction,
    get_hcp_profile,
    schedule_followup,
    generate_summary
)


# ==========================================
# Load Environment Variables
# ==========================================

load_dotenv()


# ==========================================
# Groq LLM Setup
# ==========================================

llm = ChatGroq(
    model=os.getenv(
        "MODEL_NAME",
        "llama-3.1-8b-instant"
    ),
    groq_api_key=os.getenv("GROQ_API_KEY"),
    temperature=0,
)


# ==========================================
# CRM Tools
# ==========================================

tools = [
    log_interaction,
    edit_interaction,
    get_hcp_profile,
    schedule_followup,
    generate_summary
]


# ==========================================
# System Prompt
# ==========================================

SYSTEM_PROMPT = """
You are an AI First CRM Assistant for HCP interaction management.

Your responsibilities:

1. Log new HCP interactions using log_interaction tool.
2. Edit existing interactions using edit_interaction tool.
3. Fetch HCP information using get_hcp_profile tool.
4. Schedule follow-ups using schedule_followup tool.
5. Generate professional summaries using generate_summary tool.

Rules:
- Always use tools when the user request requires database/action changes.
- Do not invent HCP data.
- Extract dates correctly.
- Keep responses short and professional.
"""


# ==========================================
# Create LangGraph ReAct Agent
# ==========================================

agent = create_react_agent(
    model=llm,
    tools=tools,
    prompt=SYSTEM_PROMPT
)