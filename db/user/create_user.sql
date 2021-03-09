INSERT INTO users
( f_name, l_name, email, password )
VALUES
( $1, $2, $3, $4 )
RETURNING *;