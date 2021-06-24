const fs = require('fs')


class Helper {

    readOrderDatabase(){
        let rawOrderData = fs.readFileSync("./order.json");
        let parseOrderData = JSON.parse(rawOrderData);
    
        return parseOrderData;

    }

    getOrderData(){
        return this.readOrderDatabase();
    }



    storeOrderDatabaseData(rawOrderData){
        let data = JSON.stringify(rawOrderData);

        fs.writeFileSync("./order.json", data);

    }

    addOrderToDatabase(newOrderData){
        const currentOrderDatabase = this.getOrderData();

        currentOrderDatabase.unshift(newOrderData);

        this.storeOrderDatabaseData(currentOrderDatabase);

    }

    
    getCustomerOrder = (userName) => {
    
        const orderList = this.getOrderData();

        let orderArray = [];
    

        for (let i=0; i< orderList.length; i++){

            if(orderList[i].User == userName){

                orderArray.push(orderList[i]);

            }

        }


    
        return orderArray;
    
    }


    // Not finished yet
    deleteCustomerOrder = (userName) => {


        let orderList = this.getOrderData();

        let orderArray = [];

        
        for (let i=0; i<orderList.length; i++){

            if(orderList[i].User != userName){

                orderArray.push(orderList[i]);

                // also need to delete this order from the database

            }

        }

        return orderArray;


    }


    



}

module.exports = Helper;