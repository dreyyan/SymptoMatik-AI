from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from backend.database_manager import Base, get_db, engine  # Absolute import
from passlib.context import CryptContext
from sqlalchemy import or_

import logging
logging.basicConfig(level=logging.INFO)

app = FastAPI()

# Allow React frontend to call FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# User Model (SQLAlchemy ORM)
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)  # Stores hashed password

# Pydantic Models
class SignUpData(BaseModel):
    email: str
    username: str
    password: str
    confirm_password: str

class LoginData(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    username: str

    class Config:
        from_attributes = True  # Enable ORM mode for SQLAlchemy

# Startup event to create tables
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

import traceback

@app.post("/api/sign-up", response_model=UserResponse)
async def signup(data: SignUpData, db: AsyncSession = Depends(get_db)):
    try:
        if data.password != data.confirm_password:
            raise HTTPException(status_code=400, detail="Passwords do not match")

        hashed_password = pwd_context.hash(data.password[:72])
        user = User(
            email=data.email,
            username=data.username,
            password=hashed_password
        )

        db.add(user)
        await db.commit()
        await db.refresh(user)
        return user

    except Exception as e:
        traceback.print_exc()
        await db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal error: {e}")


# Login endpoint: http://localhost:5173/
@app.post("/api/sign-in", response_model=UserResponse)
async def login(data: LoginData, db: AsyncSession = Depends(get_db)):
    # Try matching either email OR username
    result = await db.execute(
        select(User).where(
            or_(User.email == data.email, User.username == data.email)
        )
    )
    user = result.scalars().first()
    
    if not user or not pwd_context.verify(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid username/email or password")
    
    return user

# Get users endpoint (for testing)
@app.get("/api/users", response_model=list[UserResponse])
async def get_users(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User))
    users = result.scalars().all()
    return users