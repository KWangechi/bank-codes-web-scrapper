from fastapi import Query, Depends
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_, func, and_
from typing import Optional, List
from models import Bank, Base, Branch
from fastapi import FastAPI
from schemas import BankSchema, BranchSchema
from deps import get_db
from database import engine
from uuid import UUID


app = FastAPI(title="Kenya Bank Code Search App")
Base.metadata.create_all(bind=engine)

@app.get("/banks", response_model=List[BankSchema])
def get_all_banks(
    q: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Bank)

    if q:
        query = query.filter(Bank.name.ilike(f"%{q}%"))

    return query.all()


@app.get("/banks/{bank_id}/branches", response_model=List[BranchSchema])
def get_bank_branches(
    bank_id: UUID,
    q: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Branch).filter(Branch.bank_id == bank_id)

    if q:
        query = query.filter(Branch.name.ilike(f"%{q}%"))

    return query.all()


@app.get("/search", response_model=list[BranchSchema])
def global_search(
    q: str | None = None,
    db: Session = Depends(get_db)
):
    query = (
        db.query(Branch)
        .join(Branch.bank)
        .options(joinedload(Branch.bank))
    )

    if q:
        tokens = q.lower().split()

        conditions = []
        for token in tokens:
            like = f"%{token}%"
            conditions.append(
                or_(
                    func.lower(Branch.name).ilike(like),
                    func.lower(Branch.location_name).ilike(like),
                    Branch.code.ilike(like),

                    func.lower(Bank.name).ilike(like),
                    Bank.bank_code.ilike(like),
                    Bank.swift_code.ilike(like),

                    # aliases (text[])
                    # func.lower(func.any(Bank.alias)) == token
                )
            )

        query = query.filter(and_(*conditions))

    return query.distinct(Branch.id).all()

