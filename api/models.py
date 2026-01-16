from sqlalchemy import Column, String, ForeignKey, Text, ARRAY
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base
import uuid


class Bank(Base):
    __tablename__ = "banks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    bank_code = Column(String, unique=True, nullable=False)
    swift_code = Column(String, unique=True, nullable=False)
    headquarters = Column(String, nullable=True)
    alias = Column(ARRAY(Text), nullable=True)
    telephone1 = Column(String, nullable=True)
    telephone2 = Column(String, nullable=True)
    email = Column(String, nullable=True)
    logo_url = Column(String, nullable=False)

    branches = relationship("Branch", back_populates="bank")



class Branch(Base):
    __tablename__ = "branches"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    bank_id = Column(UUID(as_uuid=True), ForeignKey("banks.id"))
    name = Column(String, nullable=False)
    code = Column(String, nullable=False)
    latitude = Column(String, nullable=True)
    longitude = Column(String, nullable=True)
    location_name = Column(String, nullable=True)


    bank = relationship("Bank", back_populates="branches")
