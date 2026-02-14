-- Migration: Create bank_location_suggestions table
-- Created: 2025-02-14
-- Description: Adds table for storing bank location suggestions submitted by users

-- Create the bank_location_suggestions table
CREATE TABLE bank_location_suggestions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bank_name VARCHAR(255) NOT NULL,
    branch_name VARCHAR(255) NOT NULL,
    branch_code VARCHAR(50) NOT NULL,
    location VARCHAR(500),
    latitude VARCHAR(20),
    longitude VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on bank_name for faster searches
CREATE INDEX idx_bank_location_suggestions_bank_name ON bank_location_suggestions(bank_name);

-- Create index on created_at for chronological ordering
CREATE INDEX idx_bank_location_suggestions_created_at ON bank_location_suggestions(created_at);

-- Add a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_bank_location_suggestions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bank_location_suggestions_updated_at_trigger
    BEFORE UPDATE ON bank_location_suggestions
    FOR EACH ROW
    EXECUTE FUNCTION update_bank_location_suggestions_updated_at();

-- Add comments for documentation
COMMENT ON TABLE bank_location_suggestions IS 'Stores bank location suggestions submitted by users for review';
COMMENT ON COLUMN bank_location_suggestions.id IS 'Unique identifier for the suggestion';
COMMENT ON COLUMN bank_location_suggestions.bank_name IS 'Name of the bank';
COMMENT ON COLUMN bank_location_suggestions.branch_name IS 'Name of the branch';
COMMENT ON COLUMN bank_location_suggestions.branch_code IS 'Branch code';
COMMENT ON COLUMN bank_location_suggestions.location IS 'Location description';
COMMENT ON COLUMN bank_location_suggestions.latitude IS 'Latitude coordinate';
COMMENT ON COLUMN bank_location_suggestions.longitude IS 'Longitude coordinate';
COMMENT ON COLUMN bank_location_suggestions.created_at IS 'Timestamp when the suggestion was created';
