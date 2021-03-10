SELECT * FROM expenses
JOIN child
ON expenses.child_id = child.child_id
WHERE expenses.child_id = $1;