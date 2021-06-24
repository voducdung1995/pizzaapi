const axios = require('axios');

const getApiOrderURL = `https://order-pizza-api.herokuapp.com/api/orders`;



class Test {

    getOrder = () => {

        return axios.get(getApiOrderURL,{

            headers: {

                "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjQwNTUwMTAsIm5iZiI6MTYyNDA1NTAxMCwianRpIjoiY2NmMDQ5OTAtMTM3ZS00NWMzLWExMmYtMGQ0YmU0NzJlN2VlIiwiZXhwIjoxNjI0MDU1OTEwLCJpZGVudGl0eSI6InRlc3QiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.k0F_8KeVMSkOM3g6mUhm4am5KAl4QijHqiFDEcle6bQ"

            }



        })

    }

    createOrder = () => {

        axios.post(`https://order-pizza-api.herokuapp.com/api/orders`, {

            "Crust": "string",
            "Flavor": "string",
            "Size": "string",
            "Table_No": 1

        }, 

        {
        headers:    {

            "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjQwNDQ1NDYsIm5iZiI6MTYyNDA0NDU0NiwianRpIjoiYjZmZWYwYjItZGIyOC00ZTIwLWExYTYtNDIxMjVkN2Q1OWYzIiwiZXhwIjoxNjI0MDQ1NDQ2LCJpZGVudGl0eSI6InRlc3QiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.X9ERLTYhSgcu5DfGRWnNt7ee5WUnquEMiPj-Q-_GOio"

                    }
        }).then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });


    }





}

module.exports = Test;
