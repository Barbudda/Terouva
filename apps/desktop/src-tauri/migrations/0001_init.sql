-- Terouva v0.1 — initial schema
-- Single-user, local-first SQLite store.

CREATE TABLE user_profile (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  situation TEXT,
  income_monthly INTEGER,
  guarantors TEXT,
  contract_type TEXT,
  intro_message TEXT,
  preferred_contact TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE search_profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  city TEXT,
  neighborhoods TEXT,
  radius_km REAL,
  price_max INTEGER,
  surface_min INTEGER,
  rooms_min INTEGER,
  furnished TEXT,
  property_type TEXT,
  keywords_must TEXT,
  keywords_exclude TEXT,
  must_have_elevator INTEGER DEFAULT 0,
  must_have_balcony INTEGER DEFAULT 0,
  must_have_parking INTEGER DEFAULT 0,
  must_have_cave INTEGER DEFAULT 0,
  floor_min INTEGER,
  floor_max INTEGER,
  lbc_search_url TEXT,
  check_frequency_minutes INTEGER DEFAULT 30,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE listings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  search_profile_id INTEGER REFERENCES search_profiles(id) ON DELETE SET NULL,
  external_id TEXT,
  source TEXT DEFAULT 'leboncoin',
  url TEXT UNIQUE NOT NULL,
  title TEXT,
  price INTEGER,
  city TEXT,
  postal_code TEXT,
  surface INTEGER,
  rooms INTEGER,
  furnished INTEGER,
  property_type TEXT,
  description TEXT,
  images TEXT,
  publisher_name TEXT,
  publisher_type TEXT,
  published_at TEXT,
  discovered_at TEXT DEFAULT (datetime('now')),
  status TEXT DEFAULT 'new',
  score INTEGER,
  score_reasons TEXT,
  notes TEXT,
  raw_html TEXT
);

CREATE TABLE applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id INTEGER NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  message TEXT,
  message_tone TEXT,
  status TEXT DEFAULT 'prepared',
  sent_at TEXT,
  follow_up_at TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT,
  file_path TEXT,
  required INTEGER DEFAULT 0,
  available INTEGER DEFAULT 0,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE app_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_score ON listings(score DESC);
CREATE INDEX idx_listings_discovered ON listings(discovered_at DESC);
CREATE INDEX idx_applications_status ON applications(status);

INSERT INTO user_profile (id) VALUES (1);

INSERT INTO documents (name, category, required, available) VALUES
  ('Pièce d''identité', 'identité', 1, 0),
  ('3 derniers bulletins de salaire', 'revenus', 1, 0),
  ('Contrat de travail', 'pro', 1, 0),
  ('Dernier avis d''imposition', 'fiscal', 1, 0),
  ('Justificatif de domicile', 'logement', 1, 0),
  ('Quittance de loyer (3 derniers mois)', 'logement', 0, 0),
  ('Pièce d''identité du garant', 'garant', 0, 0),
  ('3 derniers bulletins de salaire du garant', 'garant', 0, 0),
  ('Dernier avis d''imposition du garant', 'garant', 0, 0),
  ('RIB', 'autre', 0, 0);

INSERT INTO app_settings (key, value) VALUES
  ('theme', 'dark'),
  ('default_message_tone', 'pro'),
  ('notification_min_score', '70');
