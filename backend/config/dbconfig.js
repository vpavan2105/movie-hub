const mongoose = require('mongoose');
require('dotenv').config()

const connectionToDB = async () => {
    try{
        
        await mongoose.connect(process.env.MONGO_STR)
        console.log('Connecting to database');
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = {
    connectionToDB
}