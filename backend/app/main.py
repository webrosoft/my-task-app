from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router
from app.database import Base, engine

app = FastAPI()

# Allow frontend CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables if not exist
Base.metadata.create_all(bind=engine)

# Register routes
app.include_router(router)
