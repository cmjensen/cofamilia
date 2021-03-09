UPDATE expenses
SET amount = $2,
    description = $3
WHERE expense_id = $1
RETURNING *;