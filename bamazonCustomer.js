var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,
    
    user: "root",

    password: "root",

    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId + "\n")
    loadItems();
});

function loadItems() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;

        console.table(res);

        inquireCustomer(res)
    })
}