from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from datetime import datetime


class BranchSchema(BaseModel):
    id: UUID
    bank_id: UUID
    name: str
    code: str
    latitude: Optional[str]
    longitude: Optional[str]
    location_name: Optional[str]
    operating_hours: Optional[object]
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
    ussd_code: Optional[str]
    mpesa_paybill_no: Optional[str]

    class Config:
        from_attributes = True


class PaginatedBranches(BaseModel):
    page: int
    page_size: int
    total: int
    data: List[BranchSchema]


class BankLocationSuggestionSchema(BaseModel):
    id: UUID
    bank_name: str
    branch_name: str
    branch_code: str
    location: Optional[str]
    latitude: Optional[str]
    longitude: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
