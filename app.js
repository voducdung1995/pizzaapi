const express = require('express');
const app = express();
const port = 3000;


// Class "user" to add a user to the internal database
const User = require('./user.js');
const user = new User();

// Class "helper" to add the received json list of orders to the internal database
const Helper = require('./helper.js');
const helper = new Helper();

// Class "order" to call the get request from the pizza api
const Order = require('./order.js');
const order = new Order();

const { response } = require('express');
const { default: axios } = require('axios');




app.use(express.json());

app.listen(port, ()=> console.log(`listen on port ${port}`));



// Post method to add a user to the database
app.post("/user", (req,res)=> {

    res.send("User succesfully added to the database.");


    const newUser = {
        "user": `${req.query.user}`,
        "password": `${req.query.password}`
    
    }

    user.addUserToDatabase(newUser);

})


// Get method to get the list of orders of a specific person
app.get('/orderlist', (req,res)=>{

const orderClientName = req.query.name;
const orderListData = helper.getCustomerOrder(orderClientName);

// const orderListData = helper.getCustomerOrder("Max");

res.send(orderListData);

})





// Test JSON body (order) of a request

let testOrder = [
    {
        "User": "Max",
        "Crust": "THIN",
        "Flavor": "Hawaii",
        "Order_ID": 1,
        "Size": "M",
        "Table_No": 10000,
        "Timestamp": "2018-12-12T13:42:13.704148+00:00"
    },

    {
        "User": "Max",
        "Crust": "THIN",
        "Flavor": "Regina",
        "Order_ID": 2,
        "Size": "L",
        "Table_No": 10000,
        "Timestamp": "2018-12-12T13:42:13.704148+00:00"
    },

      {
          "User": "Laura",
          "Crust": "THIN",
          "Flavor": "Quattro-Formaggi",
          "Order_ID": 3,
          "Size": "L",
          "Table_No": 10000,
          "Timestamp": "2018-12-12T13:42:13.704148+00:00"
        }
 

]


/* 
This post method will take the received json list from the application and will
do a post-request for each single item in the list to the pizza-api. One post request order to the pizza
takes one second.

*/

app.post('/order', (req,res)=> {

    /*
    const receivedOrderList = req.body

    */

    // receivedOrderList.forEach((singleOrder,i)=>{
    testOrder.forEach((singleOrder,i)=>{

        setTimeout(() => {

            
            axios.post(`https://order-pizza-api.herokuapp.com/api/orders`,

            {   
                "Crust": singleOrder.Crust,
                "Flavor": singleOrder.Flavor, 
                "Size": singleOrder.Size,
                // Generate a random number between 10000 and 11000
                "Table_No": Math.floor(Math.random() * (Math.floor(11000) - Math.ceil(10000))) + Math.ceil(10000)
                
            },
            {
                headers:    
                {
            
                    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjQzMTEwNDMsIm5iZiI6MTYyNDMxMTA0MywianRpIjoiNjdlZTM0MGEtNGJmNC00NWMzLWEyYTYtZWFjYWEwMjI5M2QwIiwiZXhwIjoxNjI0MzExOTQzLCJpZGVudGl0eSI6InRlc3QiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.g3Q35UUwdTAtYZUO6tA8U50BzajQhZ_1zyK3FWkbov4"
            
                }
            })

          }, i * 1000);

    });


})

/*
This post method will take the received json list from the application and will
save each order in the list to the internal database with the name of the person who
ordered that pizza. Normally this function should be included in the /order api-endpoint,
but there is a bug, that wont successfully execute both functions at the same time.

So the in the frontend application, the application has to call both api endpoints
order and order1 at the same time with the same json list package.


*/

app.post('/order1', (req,res)=> {

    /*
    const receivedOrderList = req.body

    */

    // for (let i=0; i<receivedOrderList.length; i++){

    for (let i=0; i<testOrder.length; i++){

        let newOrder = {

            "User": testOrder[i].User,
            "Crust": testOrder[i].Crust,
            "Flavor": testOrder[i].Flavor,
            "Order_ID": i,
            "Size": testOrder[i].Size        
            
            

            /*
            "User": receivedOrderList[i].User,
            "Crust": receivedOrderList[i].Crust,
            "Flavor": receivedOrderList[i].Flavor,
            "Order_ID": i,
            "Size": receivedOrderList[i].Size       
            */

        }

        helper.addOrderToDatabase(newOrder);


    }


})



app.delete('/deleteorders', (req, res) => {
    res.send("DELETE Request Called")


        // const orderClientName = req.query.name;

        // const orderListData = helper.deleteCustomerOrder("orderClientName");

    
        const orderListData = helper.deleteCustomerOrder("Max");
    
        res.send(orderListData);

        for (let i=0; i<orderListData.length; i++){

            axios.delete('https://order-pizza-api.herokuapp.com/api/orders',
            
            {
                params:{
                    Order_ID: orderListData[i].Order_ID
                },
                
                headers:    
                {
            
                    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjQzMTEwNDMsIm5iZiI6MTYyNDMxMTA0MywianRpIjoiNjdlZTM0MGEtNGJmNC00NWMzLWEyYTYtZWFjYWEwMjI5M2QwIiwiZXhwIjoxNjI0MzExOTQzLCJpZGVudGl0eSI6InRlc3QiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.g3Q35UUwdTAtYZUO6tA8U50BzajQhZ_1zyK3FWkbov4"
            
                }
            });
        
    

        }
        


})


// Get Request - to get the order list from the pizza api
// Get Request - with helper class Order

app.get('/getfromapi', (req,res)=>{

order.getOrder().then((response)=> {

    res.status(200).send(response.data);

}).catch((error)=> {

    res.status(400).send(error); 

})

})

