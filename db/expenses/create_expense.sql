INSERT INTO expenses
( amount, description, user_id )
VALUES
( $1, $2, $3 );

SELECT * FROM expenses;