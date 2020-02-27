# bamazon
A node app for a store front called BAMAZON!

## This app utilizes a CLI (Command line input)
As with the last project this is designed to run in a terminal(VScode or Git)!
It is targetted to anyone who wants to mess with the store front.

### Before you begin and fork the code
Make sure you install inquirer, mysql, and console.table
You will also need to have mySQL downloaded on your computer and have your local host setup.
You will also need node installed on your VPN.


The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

 Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

 However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

#### Examples of it being used!
![terminal-action](/images/one.PNG)
You can see with the red boxes where the magic is happening, when you buy an item it causes the table to change as well as it shows the price for how much the total items bought are.
![terminal-action2](/images/two.PNG)
Here you can see that if you try to buy more than the quantity youll see that you cant and it prompts you to buy again.
