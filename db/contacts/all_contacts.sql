SELECT * 
FROM contacts
WHERE child_id = $5
ORDER BY contact_f_name ASC;