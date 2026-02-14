# Database Migrations

This directory contains SQL migration files for managing database schema changes.

## Running Migrations

### Method 1: Using psql Command Line

```bash
# Connect to your PostgreSQL database and run the migration
psql -h localhost -U your_username -d your_database_name -f migrations/001_create_bank_location_suggestions_table.sql
```

Replace the connection parameters with your actual database credentials:
- `-h`: Host (default: localhost)
- `-U`: Username
- `-d`: Database name
- `-f`: Path to migration file

### Method 2: Using psql with Environment Variables

```bash
# Set environment variables (optional)
export PGHOST=localhost
export PGUSER=your_username
export PGDATABASE=your_database_name
export PGPASSWORD=your_password

# Run the migration
psql -f migrations/001_create_bank_location_suggestions_table.sql
```

### Method 3: Using Docker (if using Docker)

```bash
# If your PostgreSQL is running in Docker
docker exec -i your_postgres_container psql -U your_username -d your_database_name -f migrations/001_create_bank_location_suggestions_table.sql
```

### Method 4: Using Python with psycopg2

Create a migration script:

```python
import psycopg2
import os

# Database connection parameters
conn_params = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'database': os.getenv('DB_NAME', 'your_database'),
    'user': os.getenv('DB_USER', 'your_username'),
    'password': os.getenv('DB_PASSWORD', 'your_password')
}

# Read migration file
with open('migrations/001_create_bank_location_suggestions_table.sql', 'r') as f:
    migration_sql = f.read()

# Execute migration
try:
    conn = psycopg2.connect(**conn_params)
    cursor = conn.cursor()
    cursor.execute(migration_sql)
    conn.commit()
    print("Migration executed successfully!")
except Exception as e:
    conn.rollback()
    print(f"Migration failed: {e}")
finally:
    cursor.close()
    conn.close()
```

## Migration File Naming Convention

Migration files should be named with the following pattern:
```
NNN_description.sql
```

Where:
- `NNN` is a 3-digit sequential number (001, 002, 003, etc.)
- `description` is a short, descriptive name in lowercase with underscores

## Migration Best Practices

1. **Always backup your database** before running migrations
2. **Test migrations** on a development/staging environment first
3. **Use transactions** when possible to ensure atomicity
4. **Add indexes** for performance on frequently queried columns
5. **Include rollback scripts** for complex migrations
6. **Document changes** in the migration file comments

## Current Migration: 001_create_bank_location_suggestions_table.sql

This migration creates the `bank_location_suggestions` table with:
- UUID primary key
- Required fields: bank_name, branch_name, branch_code
- Optional fields: location, latitude, longitude
- Automatic timestamp tracking
- Performance indexes
- Documentation comments

## Verifying Migration Success

After running the migration, verify it worked correctly:

```sql
-- Check if table exists
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'bank_location_suggestions';

-- Check table structure
\d bank_location_suggestions

-- Check indexes
SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'bank_location_suggestions';

-- Check triggers
SELECT tgname FROM pg_trigger WHERE tgrelid = 'bank_location_suggestions'::regclass;