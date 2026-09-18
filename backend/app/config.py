from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Union

class Settings(BaseSettings):
    database_url: str = "sqlite:///./sales_dashboard.db"  # Fallback for local testing if env is missing
    cors_origins: Union[str, List[str]] = ["http://localhost:5173"]
    max_upload_size_mb: int = 10
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @property
    def cors_origins_list(self) -> List[str]:
        if isinstance(self.cors_origins, str):
            return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]
        return self.cors_origins

settings = Settings()
