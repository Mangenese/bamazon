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

        inquireCustomerForItem(res)
    })
}

function inquireCustomerForItem(quantity) {
    inquirer
        .prompt([
            {
            type: "input",
            name: "choice",
            message: "What is the ID of the item you would to buy?",
            validate: function(val){
                return !isNaN(val)
            }
        }
    ]).then(function(val){
        var choice = parseInt(val.choice);
        var product = checkQunatity(choice, quantity);

        if(product) {
            inquireCustomerForQuantity(product);
        }
        else {
            console.log("\n Sorry! That doesnt seem to be in stock!\n");
            loadItems();
        }
    })
}
function inquireCustomerForQuantity(product) {
    inquirer
    .prompt([
        {
            type: "input",
            name: "quantity",
            message: "How many would you like?",
            validate: function(val) {
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

function makeTransaction(product, quantity) {
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

function checkQunatity(choice, quantity) {
    for (var i = 0; i <quantity.length; i++){
        if (quantity[i].item_id === choice) {
            return quantity[i];
        }
    }
    return null;
}