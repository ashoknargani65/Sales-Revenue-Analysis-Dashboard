from pydantic import BaseModel
from typing import List, Optional

class UploadResponse(BaseModel):
    message: str
    total_records: int
    processed_records: int
    rejected_records: int
    duplicate_records: int
