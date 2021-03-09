INSERT INTO schedule
( date, user_id, child_id )
VALUES
( $1, $2, $3 )
RETURNING *;