INSERT INTO contacts
( contact_f_name, contact_l_name, number, user_id )
VALUES
( $1, $2, $3, $4 )
RETURNING *;