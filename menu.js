const inquirer = require("inquirer");
const mysql = require("mysql2");

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

function viewAllDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.error("Query error: " + err.message);
      return;
    }
    console.table(results);
    mainMenu();
  });
} // viewAllDepartments ends

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartmentName",
        message: "Enter the name of the new department",
      },
    ])
    .then((answers) => {
      // ask user to enter new department name
      // then use the new department name in INSERT INTO
      const newDepartmentName = answers.newDepartmentName;
      const sql = `INSERT INTO department (name)
        VALUES
            ( '${newDepartmentName}' )`;

      db.query(sql, function (err, results) {
        if (err) {
          console.error("Query error: " + err.message);
          return;
        }

        mainMenu();
      });
    }); // waited for user
} // viewAllDepartments ends


function viewAllRoles() {
  db.query(`SELECT role.id, title, department.name as department, salary FROM role
  LEFT JOIN department
  ON role.department_id = department.id;
  `, function (err, results) {
    if (err) {
      console.error("Query error: " + err.message);
      return;
    }
    console.table(results);
    mainMenu();
  });
} // viewAllDepartments ends

function addRole() {
  db.query("SELECT * FROM department", function (err, results) {
    //console.log(results)
    // name=name, value=id
    /** 
    for(var i=0; i<results.length; i++) {
      newArray[i].value = results[i].id
    }
    */
    const departmentChoices = results.map((aResult) => {
      return {
        name: aResult.name,
        value: aResult.id,
      };

    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "newRoleTitle",
          message: "Enter the title of the new role",
        },
        {
          type: "input",
          name: "newRoleSalary",
          message: "Enter the salary",
        },
        {
          type: "list",
          name: "newRoleDepartment",
          message: "Select the department",
          choices: departmentChoices
        }
      ])
      .then((answers) => {
        // ask user to enter new department name
        // then use the new department name in INSERT INTO
        //const newRoleTitle = answers.newRoleTitle;
        const sql = `INSERT INTO role (title, salary, department_id)
          VALUES
              ( '${answers.newRoleTitle}', ${answers.newRoleSalary}, ${answers.newRoleDepartment} )`;
  
        db.query(sql, function (err, results) {
          if (err) {
            console.error("Query error: " + err.message);
            return;
          }
  
          mainMenu();
        });
      }); // waited for user
  });

  } // addRole ends



  function addEmployee() {
    db.query("SELECT * FROM role", function (err, results) {
      //console.log(results)
      // name=name, value=id
      /** 
      for(var i=0; i<results.length; i++) {
        newArray[i].value = results[i].id
      }
      */
      const roleChoices = results.map((aResult) => {
        return {
          name: aResult.title,
          value: aResult.id,
        };
  
      }); // roleChoices ends
      

      db.query("SELECT * FROM employee", function (err, results) {
        if(err) {
          console.error("Query error: " + err.message);
          return;
        }

        const managerChoices = results.map((aResult) => {
          return {
            name: aResult.first_name + " " + aResult.last_name,
            value: aResult.id,
          };
    
        }); // managerChoices ends

        inquirer
        .prompt([
          {
            type: "input",
            name: "newEmployeeFirstName",
            message: "Enter the new employee's first name",
          },
          {
            type: "input",
            name: "newEmployeeLastName",
            message: "Enter the new employee's last name",
          },
          {
            type: "list",
            name: "newEmployeeRole",
            message: "Select the new employee's role",
            choices: roleChoices
          },
          {
            type: "confirm",
            name: "hasManager",
            message: "Does the new employee have a manager?",
          },
          {
            type: "list",
            name: "newManager",
            message: "Select the new employee's manager",
            when: function(answers) {
              return answers.hasManager;
            },
            choices: managerChoices
          }
        ])
        .then((answers) => {
          // ask user to enter new department name
          // then use the new department name in INSERT INTO
          //const newRoleTitle = answers.newRoleTitle;

          const sql = `INSERT INTO employee (first_name, last_name, role_id`
          + (answers.hasManager ? `, manager_id)` : `)`)
          + `
          VALUES
          (
              '${answers.newEmployeeFirstName}', 
              '${answers.newEmployeeLastName}', 
              ${answers.newEmployeeRole}`
              + (answers.hasManager ? `, ${answers.newManager}` : ``)
              + `)`;
            //console.log({sql})

          db.query(sql, function (err, results) {
            if (err) {
              console.error("Query error: " + err.message);
              return;
            }
    
             mainMenu();
          }); // db.query INSERTION ends
        }); // waited for user
      }) // db.query ends

    });
  } // addEmployee ends

  function viewAllEmployees() {
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
    
    mainMenu();
  });
  } // viewAllEmployees

  function updateEmployeeRole() {

    db.query("SELECT * FROM employee", function (err, results) {
      if (err) {
        console.error("Query error: " + err.message);
        return;
      }
      //console.log(results)
      const employeeChoices = results.map((employee) => {
          return {
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
          };
      });
      console.log(employeeChoices)

      db.query("SELECT * FROM role", function (err, results) {
        if (err) {
          console.error("Query error: " + err.message);
          return;
        }
        const roleChoices = results.map((roleChoice) => {
          return {
              name: roleChoice.title,
              value: roleChoice.id,
          }
        }); // roleChoices defined

        console.log(roleChoices)

        
        inquirer.prompt([
          {
              type: "list",
              name: "employeeChosen",
              message: "Select an employee to update",
              choices: employeeChoices,
          },
          {
              type: "list",
              name: "roleChosen",
              message: "Select the new job",
              choices: roleChoices,
          }
        ]).then((answers) => {
            console.log(answers)

            db.query("UPDATE employee SET role_id = ? WHERE id = ?", [answers.roleChosen, answers.employeeChosen], function (err, results) {
              if(err) {
                console.error("Query error: " + err.message);
                return;
              }
              console.log("Employee role updated");
            });

            mainMenu();
            //const employeeId = answers.employeeChosen
        }); // inquirer.prompt ends

      }); // db.query ends

    }) 
} // updateEmployeeRole ends
  


function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "feature", // answers.feature
        message: "HR Management App: Choose your action",
        choices: [
          "view all departments",

          "view all roles",

          "view all employees",

          "add a department",

          "add a role",

          "add an employee",

          "update an employee role",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.feature) {
        case "view all departments":
          viewAllDepartments();
          break;
        case "view all roles":
          viewAllRoles();
          break;
        case "view all employees":
          viewAllEmployees();
          break;
        case "add a department":
          addDepartment();
          break;
        case "add a role":
          addRole();
          break;
        case "add an employee":
          addEmployee();
          break;
        case "update an employee role":
          updateEmployeeRole();
      }
    }); // then ends
} // main menu ends

mainMenu();
