from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "DTM View Core"
    cors_origins: list[str] = ["http://localhost:5173"]

    class Config:
        env_file = ".env"


settings = Settings()
