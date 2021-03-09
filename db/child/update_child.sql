UPDATE child
SET parent2_id = $1
WHERE child_code = $2;

SELECT * FROM child
WHERE child_code = $2;