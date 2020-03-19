const fs = require("fs");

var managerHTML = require("./managerHTML");
var engineerHTML = require("./engineerHTML");
var internHTML = require("./internHTML");

function render(employees) {
    const html = [`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>My Team</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
        <script src="https://kit.fontawesome.com/c502137733.js"></script>
    </head>
    
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 jumbotron mb-3 team-heading bg-danger">
                    <h1 class="text-center text-white">My Team</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="team-area col-12 d-flex justify-content-center">`];
    html.push(employees
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => managerHTML(manager)));
    html.push(employees
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => engineerHTML(engineer)));
    html.push(employees
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => internHTML(intern)));

    html.push(`</div>
    </div>
</div>
</body>

</html>`);

    return html.join("");
};
module.exports = render;