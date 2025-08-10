INSERT INTO tb_provider (provider_name)
VALUES 
('Google'),
('GitHub');

INSERT INTO tb_link (link_long, link_short)
VALUES
('https://app.chartdb.io/diagrams/o7zob648hf42', 'super-shorter'),
('https://leetcode.com/problemset/', 'leetcode');

INSERT INTO tb_link_per_user (user_id, link_id)
VALUES
('3f206f73-fd12-4c57-8313-6500549404f2', '3ec93f6a-c0b9-42b4-bc17-2927b2bb2512'),
('3f206f73-fd12-4c57-8313-6500549404f2', '0d60b7ab-33ee-453a-a5cc-8b55a9657250');