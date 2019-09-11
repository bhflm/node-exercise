# BigCorp API

Read only JSON api for 3 resources, `employees`, `departments`, and `offices`. 

Built with Node.js and Express. 

Endpoints available `(routes.js)`: 

```
Employees

/employees/:id   [detail]
/employees       [list]

Departments

/departments/:id [detail]
/departments     [list]

Offices 

/offices/:id     [detail]
/offices         [list]
``` 
Note: all of these routes are GET requests.

They accept the following query parameters as well :

List: `expand`, `limit`, and `offset`

# Commands: 

* Running the server:
`npm start-dev`

* Tests:
`npm run tests`

