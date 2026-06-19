from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class ProjectBase(BaseModel):
    title: str
    summary: Optional[str] = ""
    results: Optional[str] = ""
    tech_stack: Optional[str] = ""
    image_url: Optional[str] = ""
    status: Optional[str] = "DRAFT"
    detail_content: Optional[str] = ""


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    summary: Optional[str] = None
    results: Optional[str] = None
    tech_stack: Optional[str] = None
    image_url: Optional[str] = None
    status: Optional[str] = None
    detail_content: Optional[str] = None


class ProjectResponse(ProjectBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime
