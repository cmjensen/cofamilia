CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    f_name VARCHAR(40) NOT NULL,
    l_name VARCHAR(40) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(400) NOT NULL
);

CREATE TABLE child (
    child_id SERIAL PRIMARY KEY,
    parent1_id INT REFERENCES users(user_id),
    parent2_id INT REFERENCES users(user_id),
    child_name VARCHAR(40) NOT NULL,
    child_code INT UNIQUE NOT NULL
);

CREATE TABLE expenses (
    expense_id SERIAL PRIMARY KEY,
    amount FLOAT(2) NOT NULL,
    description VARCHAR(50) NOT NULL,
    child_id INT REFERENCES child(child_id)
);

CREATE TABLE contacts (
    contact_id SERIAL PRIMARY KEY,
    contact_f_name VARCHAR(40),
    contact_l_name VARCHAR(40),
    number VARCHAR(10) NOT NULL,
    category VARCHAR(40),
    child_id INT REFERENCES child(child_id)
);

-- CREATE TABLE schedule (
--     schedule_id SERIAL PRIMARY KEY,
--     date DATE NOT NULL,
--     child_id INT REFERENCES child(child_id)
-- );
