from dotenv import load_dotenv
import os
from pathlib import Path

# Resolve project root
BASE_DIR = Path(__file__).resolve().parent.parent

# Load .env explicitly
load_dotenv(BASE_DIR / ".env")


DB_ENGINE = os.getenv("DB_ENGINE")
DB_API = os.getenv("DB_API")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

print(f"THE DB API", DB_API)

DATABASE_URL = (
    f"{DB_ENGINE}+{DB_API}://"
    f"{DB_USER}:{DB_PASSWORD}@"
    f"{DB_HOST}:{DB_PORT}/"
    f"{DB_NAME}"
)