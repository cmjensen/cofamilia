UPDATE contacts
SET contact_f_name = $2,
    contact_l_name = $3,
    number = $4
WHERE contact_id = $1
RETURNING *;
