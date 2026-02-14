import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()


# Database connection parameters
conn_params = {
    "host": os.getenv("DB_HOST"),
    "dbname": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "port": int(os.getenv("DB_PORT", 5432)),
}

# print(conn_params);

# Read migration file
with open("migrations/001_create_bank_location_suggestions_table.sql", "r") as f:
    print("Running migrations...")

    migration_sql = f.read()

    # Connect to the DB
    conn = psycopg2.connect(**conn_params)
    cursor = conn.cursor()


try:
    cursor.execute(migration_sql)
    conn.commit()
    print("Migration executed successfully!")
except Exception as e:
    conn.rollback()
    print(f"Migration failed: {e}")
finally:
    cursor.close()
    conn.close()
