SELECT * FROM contacts
JOIN child
ON contacts.child_id = child.child_id
WHERE contacts.child_id = $1;