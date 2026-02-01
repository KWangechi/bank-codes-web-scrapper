from fastapi import Query, Depends, HTTPException, Response
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_, func, and_, select, text
from typing import Optional, List
from models import Bank, Base, Branch
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import BankSchema, BranchSchema, PaginatedBranches
from deps import get_db
from database import engine
from uuid import UUID
from query_builders import build_branches_query, build_global_search_query
import json
import pandas as pd
from io import BytesIO

app = FastAPI(title="Kenya Bank Code Search App")
Base.metadata.create_all(bind=engine)

origins = ["http://localhost:3000", "http://localhost:8080", "http://localhost:8000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/banks", response_model=List[BankSchema])
def get_all_banks(q: Optional[str] = Query(None), db: Session = Depends(get_db)):
    query = db.query(Bank)

    if q:
        query = query.filter(Bank.name.ilike(f"%{q}%"))

    return query.all()


@app.get("/banks/{bank_id}/branches", response_model=List[BranchSchema])
def get_bank_branches(
    bank_id: UUID,
    q: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    query = build_branches_query(db, bank_id=bank_id)
    return paginate(query, page, page_size)


@app.get("/search", response_model=PaginatedBranches)
def global_search(
    q: str | None = None,
    bank_name: str | None = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    query = build_global_search_query(db, q, bank_name)

    return paginate(query, page, page_size)


# Download
@app.get("/download/asJson")
def downloadDataAsJson(
    q: str | None = None,
    bank_name: str | None = None,
    db: Session = Depends(get_db),
):
    query = build_global_search_query(db, q, bank_name)

    # Get all data without pagination
    branches = query.distinct(Branch.id).all()

    # Convert to JSON format
    data = []
    for branch in branches:
        branch_data = {
            "name": branch.name,
            "code": branch.code,
            "latitude": branch.latitude,
            "longitude": branch.longitude,
            "location_name": branch.location_name,
            "bank": {
                "name": branch.bank.name,
                "bank_code": branch.bank.bank_code,
                "swift_code": branch.bank.swift_code,
                "headquarters": branch.bank.headquarters,
                "alias": branch.bank.alias,
                "telephone1": branch.bank.telephone1,
                "telephone2": branch.bank.telephone2,
                "email": branch.bank.email,
                "logo_url": branch.bank.logo_url,
                "ussd_code": branch.bank.ussd_code,
                "mpesa_paybill_no.": branch.bank.mpesa_paybill_no,
            },
        }
        data.append(branch_data)

    # Create JSON response
    json_data = json.dumps(data, indent=2)

    return Response(
        content=json_data,
        media_type="application/json",
        headers={"Content-Disposition": "attachment; filename=bank_branches.json"},
    )


@app.get("/download/asExcel")
def downloadDataAsExcel(
    q: str | None = None,
    bank_name: str | None = None,
    db: Session = Depends(get_db),
):
    query = build_global_search_query(db, q, bank_name)

    # Get all data without pagination
    branches = query.distinct(Branch.id).all()

    # Convert to DataFrame
    data = []
    for branch in branches:
        data.append(
            {
                "Branch Name": branch.name,
                "Branch Code": branch.code,
                "Latitude": branch.latitude,
                "Longitude": branch.longitude,
                "Location Name": branch.location_name,
                "Bank Name": branch.bank.name,
                "Bank Code": branch.bank.bank_code,
                "Swift Code": branch.bank.swift_code,
                "Headquarters": branch.bank.headquarters,
                "Telephone 1": branch.bank.telephone1,
                "Telephone 2": branch.bank.telephone2,
                "Email": branch.bank.email,
                "USSD Code": branch.bank.ussd_code,
                "Mpesa Paybill No.": branch.bank.mpesa_paybill_no,
            }
        )

    df = pd.DataFrame(data)

    # Create Excel file in memory
    output = BytesIO()
    with pd.ExcelWriter(output, engine="openpyxl") as writer:
        df.to_excel(writer, index=False, sheet_name="Bank Branches")

    # Get the Excel file content
    excel_data = output.getvalue()

    return Response(
        content=excel_data,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=bank_branches.xlsx"},
    )


def paginate(
    query,
    page: int,
    page_size: int,
):
    total = query.with_entities(func.count(func.distinct(Branch.id))).scalar()

    offset = (page - 1) * page_size
    data = query.distinct(Branch.id).limit(page_size).offset(offset).all()

    return {
        "page": page,
        "page_size": page_size,
        "total": total,
        "data": data,
    }
