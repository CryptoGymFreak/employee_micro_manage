const inquirer = require("inquirer");
const mysql = require("mysql2");
const express = require("express");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Juliusson1$",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

db.query("SELECT * FROM employee", function (err, results) {
  if (err) {
    console.error("Query error: " + err.message);
    return;
  }
  console.table(results);
});
db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, CONCAT(managers.first_name, " ", managers.last_name) as manager FROM employee
LEFT JOIN employee as managers
ON employee.manager_id = managers.id

JOIN role
ON employee.role_id = role.id

JOIN department 
ON role.department_id = department.id;`, function (err, results) {
  if (err) {
    console.error("Query error: " + err.message);
    return;
  }
  console.table(results);
});

db.query("SELECT * FROM department", function (err, results) {
  if (err) {
    console.error("Query error: " + err.message);
    return;
  }
  console.table(results);
});


app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
