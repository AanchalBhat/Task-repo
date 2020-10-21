require("dotenv").config();

const ENV = {
    PORT : process.env.PORT,
    LOCAL_DB : process.env.LOCAL_DB,
    REMOTE_DB : process.env.REMOTE_DB,
    JWT_KEY : process.env.JWT_KEY,


}


module.exports = ENV;