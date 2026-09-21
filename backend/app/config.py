from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Union

class Settings(BaseSettings):
    database_url: str = "sqlite:///./sales_dashboard.db"  # Fallback for local testing if env is missing
    cors_origins: Union[str, List[str]] = ["http://localhost:5173"]
    max_upload_size_mb: int = 10

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @field_validator("database_url")
    @classmethod
    def normalize_database_url(cls, v: str) -> str:
        # Some providers give postgres://, which SQLAlchemy 2.x doesn't accept
        if v.startswith("postgres://"):
            v = v.replace("postgres://", "postgresql+psycopg2://", 1)
        return v

    @property
    def cors_origins_list(self) -> List[str]:
        if isinstance(self.cors_origins, str):
            origins = [o.strip() for o in self.cors_origins.split(",") if o.strip()]
        else:
            origins = self.cors_origins
        return [o.rstrip("/") for o in origins]

settings = Settings()