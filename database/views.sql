CREATE VIEW vw_user
AS
SELECT
  user_id AS "id",
  user_name AS "name",
  user_email AS "email",
  user_avatar AS "avatar",
  tu.provider_id AS provider_id,
  provider_name AS provider_name,
  created_at
FROM
tb_users tu
INNER JOIN tb_provider tp ON tu.provider_id = tp.provider_id;

SELECT * FROM vw_user;

CREATE VIEW vw_link
AS
SELECT
  link_id AS "id",
  link_long AS "long",
  link_short AS short,
  link_clicks AS clicks,
  created_at
FROM
tb_link;

SELECT * FROM vw_link;

CREATE VIEW vw_link_per_user
AS
SELECT
  tpu.user_id AS "user_id",
  tpu.link_id AS "link_id",
  link_long AS "long",
  link_short AS short,
  link_clicks AS clicks,
  tl.created_at AS "created_at"
FROM
tb_link_per_user tpu
INNER JOIN tb_link tl ON tpu.link_id = tl.link_id
INNER JOIN tb_users tu ON tpu.user_id = tu.user_id;