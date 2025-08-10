-- CREATE SEQUENCE IF NOT EXISTS tb_link_link_id_seq;

CREATE TABLE IF NOT EXISTS tb_link (
  link_id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  link_long text NOT NULL,
  link_short varchar(500) NOT NULL,
  link_clicks integer NOT NULL DEFAULT 0,
  created_at timestamp NOT NULL DEFAULT now(),
  link_index SERIAL NOT NULL
);

CREATE INDEX IF NOT EXISTS link_index ON tb_link (link_index);

-- CREATE SEQUENCE IF NOT EXISTS tb_provider_provider_id_seq;

SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_type = 'BASE TABLE'
  AND table_schema NOT IN ('information_schema', 'pg_catalog');

CREATE TABLE IF NOT EXISTS tb_provider (
  provider_id SERIAL NOT NULL PRIMARY KEY,
  provider_name varchar(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_link_per_user (
  user_id uuid NOT NULL,
  link_id uuid NOT NULL,
  PRIMARY KEY (user_id, link_id)
);

-- CREATE SEQUENCE IF NOT EXISTS tb_users_user_id_seq;

CREATE TABLE IF NOT EXISTS tb_users (
  user_id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name varchar(500) NOT NULL,
  user_email varchar(500) NOT NULL,
  user_avatar varchar(500) NOT NULL,
  provider_id bigint NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  user_index SERIAL NOT NULL
);

ALTER TABLE tb_users ADD CONSTRAINT tb_users_unique_email UNIQUE(user_email);

ALTER TABLE tb_users ADD COLUMN user_token TEXT;

CREATE INDEX IF NOT EXISTS index_user ON tb_users (user_index);

ALTER TABLE tb_link_per_user ADD CONSTRAINT tb_link_link_id_fk FOREIGN KEY (link_id) REFERENCES tb_link (link_id);

--EXECUTED
ALTER TABLE tb_users ADD CONSTRAINT tb_user_per_provider FOREIGN KEY (provider_id) REFERENCES tb_provider (provider_id);

ALTER TABLE tb_link_per_user ADD CONSTRAINT tb_users_user_id_fk FOREIGN KEY (user_id) REFERENCES tb_users (user_id);