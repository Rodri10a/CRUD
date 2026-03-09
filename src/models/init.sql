CREATE DATABASE devlearn_hub;

\c devlearn_hub

CREATE TABLE topics (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  votes INTEGER DEFAULT 0
);

CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  votes INTEGER DEFAULT 0
);
