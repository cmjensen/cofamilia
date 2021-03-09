SELECT * FROM child c 
FULL OUTER JOIN users u 
ON c.parent1_id = u.user_id OR c.parent2_id = u.user_id
WHERE u.user_id = $1;
