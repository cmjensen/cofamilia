UPDATE expenses
SET amount = $1,
    description = $2
WHERE expense_id = $3
RETURNING *;