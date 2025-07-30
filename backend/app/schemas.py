from pydantic import BaseModel
from typing import Optional

class ItemBase(BaseModel):
    name: str
    description: Optional[str] = None

class ItemCreate(ItemBase):
    weight: float  # ✅ required when creating

class ItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    weight: Optional[float] = None  # ✅ optional when updating

class ItemResponse(ItemBase):
    id: int
    weight: Optional[float] = 0.0  # 👈 make it optional with a default

    class Config:
        from_attributes = True  # use this instead of orm_mode in Pydantic v2
