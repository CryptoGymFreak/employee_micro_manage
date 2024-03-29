use employee_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Doe', 2, NULL),
  ('Alice', 'Doe', 3, 1),
  ('Bob', 'Doe', 4, 2),
  ('Charlie', 'Doe', 5, 2),
  ('David', 'Doe', 6, 3),
  ('Eve', 'Doe', 7, 3),
  ('Frank', 'Doe', 8, 4),
  ('Grace', 'Doe', 9, 4),
  ('Heidi', 'Doe', 10, 5),
  ('Ivan', 'Doe', 11, 5),
  ('Jill', 'Doe', 12, 6),
  ('Kevin', 'Doe', 13, 6),
  ('Linda', 'Doe', 14, 7),
  ('Michael', 'Doe', 15, 7),
  ('Nancy', 'Doe', 16, 8),
  ('Oscar', 'Doe', 17, 8),
  ('Patty', 'Doe', 18, 9),
  ('Quincy', 'Doe', 19, 9),
  ('Randy', 'Doe', 20, 10),
  ('Sally', 'Doe', 21, 10),
  ('Tom', 'Doe', 22, 11),
  ('Ursula', 'Doe', 23, 11),
  ('Victor', 'Doe', 24, 12),
  ('Wendy', 'Doe', 25, 12);

INSERT INTO role (title, salary, department_id) 
VALUES
  ('CEO', 1000000, 1),
  ('CFO', 500000, 1),
  ('COO', 500000, 1),
  ('VP of Sales', 250000, 2),
  ('VP of Marketing', 250000, 2),
  ('VP of Engineering', 250000, 3),
  ('VP of HR', 250000, 3),
  ('Director of Sales', 150000, 4),
  ('Director of Marketing', 150000, 4),
  ('Director of Engineering', 150000, 5),
  ('Director of HR', 150000, 5),
  ('Sales Manager', 100000, 6),
  ('Marketing Manager', 100000, 6),
  ('Engineering Manager', 100000, 7),
  ('HR Manager', 100000, 7),
  ('Salesperson', 75000, 8),
  ('Marketer', 75000, 8),
  ('Engineer', 75000, 9),
  ('HR Specialist', 75000, 9);
  

INSERT INTO department (name)
VALUES
  ('Executive'),
  ('Sales'),
  ('Marketing'),
  ('Engineering'),
  ('HR');  