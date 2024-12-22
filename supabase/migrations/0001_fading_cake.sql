/*
  # Create Tenants and Authentication Tables

  1. New Tables
    - tenants
      - id (uuid, primary key)
      - name (text)
      - domain (text, unique)
      - is_active (boolean)
      
    - auth_users
      - id (uuid, primary key) 
      - tenant_id (uuid, foreign key)
      - email (text, unique)
      - password_hash (text)
      - role (text)
      - is_active (boolean)

  2. Security
    - Enable RLS
    - Add policies for tenant isolation
*/

-- Tenants table
CREATE TABLE tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  domain text UNIQUE NOT NULL,
  logo_url text,
  theme jsonb DEFAULT '{"primary_color": "#10B981"}'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

-- Auth users table
CREATE TABLE auth_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'manager', 'waiter', 'kitchen', 'cashier')),
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE auth_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own tenant" ON tenants
  FOR SELECT
  USING (id = current_setting('app.tenant_id')::uuid);

CREATE POLICY "Users can view own tenant users" ON auth_users
  FOR SELECT
  USING (tenant_id = current_setting('app.tenant_id')::uuid);