const inquirer = require("inquirer");
const mysql = require("mysql2");
const express = require("express");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost:8000",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

db.query("SELECT * FROM employee", function (err, results) {
  if (err) {
    console.error("Query error: " + err.message);
    return;
  }
  console.log(results);
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
