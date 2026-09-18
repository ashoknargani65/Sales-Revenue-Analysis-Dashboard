import pandas as pd
from fastapi import UploadFile, HTTPException
import io

class FileService:
    ALLOWED_EXTENSIONS = {".csv", ".xlsx", ".xls"}
    MAX_FILE_SIZE_MB = 10

    @staticmethod
    async def validate_and_read(file: UploadFile) -> pd.DataFrame:
        if not any(file.filename.endswith(ext) for ext in FileService.ALLOWED_EXTENSIONS):
            raise HTTPException(status_code=400, detail="Only CSV and Excel files are supported.")
        
        contents = await file.read()
        file_size_mb = len(contents) / (1024 * 1024)
        
        if file_size_mb > FileService.MAX_FILE_SIZE_MB:
            raise HTTPException(status_code=400, detail=f"File too large. Maximum size is {FileService.MAX_FILE_SIZE_MB} MB.")
            
        if not contents:
            raise HTTPException(status_code=400, detail="The uploaded file is empty.")

        try:
            if file.filename.endswith(".csv"):
                df = pd.read_csv(io.BytesIO(contents))
            else:
                df = pd.read_excel(io.BytesIO(contents))
        except Exception as e:
            raise HTTPException(status_code=400, detail="Error reading file. Please ensure it is a valid CSV or Excel file.")
            
        if df.empty:
            raise HTTPException(status_code=400, detail="The uploaded file does not contain any data.")

        return df
