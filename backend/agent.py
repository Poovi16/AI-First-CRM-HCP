import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()

llm = ChatGroq(
    model=os.getenv("MODEL_NAME", "gemma2-9b-it"),
    groq_api_key=os.getenv("GROQ_API_KEY"),
    temperature=0,
)