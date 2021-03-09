INSERT INTO child
( parent1_id, parent2_id, child_name, child_code )
VALUES
( $1, $2, $3, $4 )
RETURNING *;