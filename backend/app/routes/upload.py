from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.file_service import FileService
from app.services.cleaning_service import CleaningService
from app.schemas.upload import UploadResponse

router = APIRouter()

@router.post("", response_model=UploadResponse)
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    df = await FileService.validate_and_read(file)
    response = CleaningService.process_and_store(df, db)
    return response
