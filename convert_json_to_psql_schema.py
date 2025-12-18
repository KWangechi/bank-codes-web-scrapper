import json
import psycopg2
from psycopg2.extras import Json

# -----------------------------
# DB CONFIG
# -----------------------------
DB_CONFIG = {
    "host": "localhost",
    "dbname": "kenya_bank_code_app",
    "user": "admin",
    "password": "admin12345",
    "port": 5432
}

# -----------------------------
# LOAD JSON
# -----------------------------
with open("bank-info-fe/src/banks_info.json", "r") as f:
    banks = json.load(f)
   
# -----------------------------
# CONNECT
# -----------------------------
conn = psycopg2.connect(**DB_CONFIG)
cur = conn.cursor()

# -----------------------------
# INSERT DATA
# -----------------------------
for bank in banks:
    # 1️⃣ Insert banks
    hq = bank.get('headquarters') or None;
    aliases = bank.get('aliases') or []

    if isinstance(aliases, str):    
        aliases = [aliases]
    
    phone1 = bank.get('contactInfo', {}).get('phone1');
    phone2 = bank.get('contactInfo', {}).get('phone2');
    email = bank.get('contactInfo', {}).get('email');

    cur.execute(
        """
        INSERT INTO banks (name, bank_code, swift_code, alias, telephone1, telephone2, email, headquarters)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id
        """,
        (bank["bank_name"],
         bank["bank_code"],
         bank["swift_code"],
         aliases,
         phone1,
         phone2,
         email,
         hq)
    )

    bank_id = cur.fetchone()[0]

    # 2️⃣ Insert branches
    for branch in bank["branches"]:
        operating_hours = branch.get('operatingHours', {})
        location_name = branch.get("address", {}).get("name") or None


        latitude = branch.get("address", {}).get("latitude") or None;
        longitude = branch.get("address", {}).get("longitude") or None;


        cur.execute(
            """
            INSERT INTO branches (bank_id, name, code, latitude, longitude, location_name, operating_hours)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """,
            (
                bank_id,
                branch["branch_name"],
                branch["branch_code"],
                latitude,
                longitude,
                location_name,
                (Json(operating_hours))
            )
        )

# -----------------------------
# COMMIT & CLOSE
# -----------------------------
conn.commit()
cur.close()
conn.close()

print("✅ Bank and Branches data successfully migrated to PostgreSQL")
