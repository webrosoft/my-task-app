from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import logging

DATABASE_URL = "mysql+pymysql://proj_user:2025@localhost:3306/proj2025"

# ✅ Enable SQL statement + parameter logging
engine = create_engine(DATABASE_URL, echo=True)
logging.basicConfig()
logging.getLogger("sqlalchemy.engine.Engine").setLevel(logging.INFO)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
