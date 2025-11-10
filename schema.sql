DROP TABLE IF EXISTS pool_members CASCADE;
DROP TABLE IF EXISTS pools CASCADE;
DROP TABLE IF EXISTS bank_entries CASCADE;
DROP TABLE IF EXISTS ship_compliance CASCADE;
DROP TABLE IF EXISTS routes CASCADE;

-- =====================================
-- 1️⃣ ROUTES TABLE
-- =====================================
CREATE TABLE routes (
    id SERIAL PRIMARY KEY,
    route_id VARCHAR(50) UNIQUE NOT NULL,
    year INT NOT NULL,
    ghg_intensity DECIMAL(10,4) NOT NULL,
    is_baseline BOOLEAN DEFAULT FALSE
);

-- =====================================
-- 2️⃣ SHIP COMPLIANCE TABLE
-- =====================================
CREATE TABLE ship_compliance (
    id SERIAL PRIMARY KEY,
    ship_id VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    cb_gco2eq DECIMAL(15,4) NOT NULL,
    UNIQUE (ship_id, year)
);

-- =====================================
-- 3️⃣ BANK ENTRIES TABLE
-- =====================================
CREATE TABLE bank_entries (
    id SERIAL PRIMARY KEY,
    ship_id VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    amount_gco2eq DECIMAL(15,4) NOT NULL,
    UNIQUE (ship_id, year)
);

-- =====================================
-- 4️⃣ POOLS TABLE
-- =====================================
CREATE TABLE pools (
    id SERIAL PRIMARY KEY,
    year INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- 5️⃣ POOL MEMBERS TABLE
-- =====================================
CREATE TABLE pool_members (
    id SERIAL PRIMARY KEY,
    pool_id INT REFERENCES pools(id) ON DELETE CASCADE,
    ship_id VARCHAR(50) NOT NULL,
    cb_before DECIMAL(15,4),
    cb_after DECIMAL(15,4),
    UNIQUE (pool_id, ship_id)
);