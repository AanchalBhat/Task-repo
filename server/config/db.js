const mongoose = require("mongoose");
const ENV = require('./env');

const dbConnection = async() => {
    try{

        await mongoose.connect( ENV.REMOTE_DB , {
            useCreateIndex : true,
            useFindAndModify : true,
            useNewUrlParser : true,
            useUnifiedTopology : true
        }).then( () => console.log("Database is connected successfully"));
    }

    catch(err){
        console.log(err);

    }
}

module.exports = dbConnection();
