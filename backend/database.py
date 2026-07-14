import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Load local .env file (Render-la environment variables automatic-a varum)
load_dotenv()

# Local-la DATABASE_URL illa na MySQL use pannum
# Render-la DATABASE_URL environment variable irundha adha use pannum
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://root:Poovi16@localhost:3306/ai_crm_hcp_v2"
)

engine = create_engine(
    DATABASE_URL,
    echo=True,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()