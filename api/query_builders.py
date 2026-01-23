from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_, func, and_
from models import Bank, Branch
from uuid import UUID

# Get all branches of banks query
def build_branches_query(db: Session, bank_id: UUID | None = None):
    query = db.query(Branch).join(Branch.bank)

    if bank_id:
        query = query.filter(Branch.bank_id == bank_id)

    return query


# Global search query
def build_global_search_query(db: Session, q: str | None, bank_name: str | None):
    query = (
        db.query(Branch)
        .join(Branch.bank)
        .options(joinedload(Branch.bank))
    )

    if bank_name:
        query = query.filter(func.lower(Bank.name).ilike(f"%{bank_name.lower()}%"))

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
                )
            )
        query = query.filter(and_(*conditions))

    return query
