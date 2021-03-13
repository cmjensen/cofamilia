UPDATE contacts
SET contact_f_name = $1,
    contact_l_name = $2, 
    number = $3,
    category = $4
WHERE contact_id = $5
RETURNING *;