from fastapi import Query, Depends
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

app = FastAPI(title="Kenya Bank Code Search App")
Base.metadata.create_all(bind=engine)

origins = ["http://localhost:3000", "http://localhost:8080"]

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
@app.get("/download/asJson", response_model=PaginatedBranches)
def downloadDataAsJson():
    return {}


@app.get("/download/asExcel", response_model=PaginatedBranches)
def downloadDataAsExcel():
    return {}


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
