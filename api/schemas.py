from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID

class BranchSchema(BaseModel):
    id: UUID
    bank_id: UUID
    name: str
    code: str
    latitude: Optional[str]
    longitude: Optional[str]
    location_name: Optional[str]
    bank: BankSchema

    class Config:
        from_attributes = True

class BankSchema(BaseModel):
    id: UUID
    name: str
    bank_code: str
    swift_code: str
    headquarters: Optional[str]
    alias: List[str]
    telephone1: Optional[str]
    telephone2: Optional[str]
    email: Optional[str]
    logo_url: str
    

    class Config:
        from_attributes = True
