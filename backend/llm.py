import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq


# ==========================================
# Load Environment Variables
# ==========================================

load_dotenv()


# ==========================================
# Groq LLM Configuration
# ==========================================

llm = ChatGroq(
    model=os.getenv(
        "MODEL_NAME",
        "llama-3.1-8b-instant"
    ),
    groq_api_key=os.getenv("GROQ_API_KEY"),
    temperature=0,
)