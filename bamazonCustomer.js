//Require calls for mysql, inquirer, console.table
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
//making the call to our SQL database
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,
    
    user: "root",

    password: "root",

    database: "bamazon"
});
//on connect it shows the connection thread
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId + "\n")
    loadItems();
});
//on connection it pull from bamazon db and produces the table in the console.log
function loadItems() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;

        console.table(res);

        inquireCustomerForItem(res)
    })
}
//function asking the user what ID they would like to buy
function inquireCustomerForItem(quantity) {
    inquirer
        .prompt([
            {
            type: "input",
            name: "choice",
            message: "What is the ID of the item you would to buy?",
            validate: function(val){
                //this function so the user has to input a number to proceed
                return !isNaN(val)
            }
        }
    ]).then(function(val){
        var choice = parseInt(val.choice);
        var product = checkQunatity(choice, quantity);
        //makes a check to see if the product you selected has enough in stock for what you want to buy
        if(product) {
            inquireCustomerForQuantity(product);
        }
        else {
            console.log("\n Sorry! That doesnt seem to be in stock!\n");
            loadItems();
        }
    })
}
//asking how much the cust wants to buy
function inquireCustomerForQuantity(product) {
    inquirer
    .prompt([
        {
            type: "input",
            name: "quantity",
            message: "How many would you like?",
            validate: function(val) {
                //user must return a value greater than 0
                return val > 0
            }
        }
    ]).then(function(val) {
        var quantity = parseInt(val.quantity);

        if (quantity > product.stock_quantity){
            console.log("\nInsufficient Quantity!");
            loadItems();
        } else {
            makeTransaction(product, quantity);
        }
    });
}
// this is the function to allow the user to buy any ID they want
function makeTransaction(product, quantity) {
    //setting a varianble so multiple of the same ID can be purchased with its amount
    var totalCost = product.price * quantity
    connection.query(
        
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
        [quantity, product.item_id],
        
        function(err, res){
            console.log("\n Successfully purchased " + quantity + " " + product.product_name + " for  $" + totalCost +  "!");
            loadItems();
        }
    );
}
//This is checking to see if the ID item is in stock or not
function checkQunatity(choice, quantity) {
    for (var i = 0; i <quantity.length; i++){
        if (quantity[i].item_id === choice) {
            return quantity[i];
        }
    }
    return null;
}