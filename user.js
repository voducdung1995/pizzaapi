const fs = require('fs')

class User {




    readUserDatabase(){
        let rawUserData = fs.readFileSync("./userdatabase.json");
        let parseUserData = JSON.parse(rawUserData);
    
        return parseUserData;

    }

    getUserDatabase(){
        return this.readUserDatabase();
    }



    storeUserDatabaseData(rawUserData){
        let data = JSON.stringify(rawUserData);

        fs.writeFileSync("./userdatabase.json", data);

    }

    addUserToDatabase(newUserData){
        const currentUserDatabase = this.getUserDatabase();

        currentUserDatabase.unshift(newUserData);

        this.storeUserDatabaseData(currentUserDatabase);

    }


}

module.exports = User;