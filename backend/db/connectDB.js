const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/chitra')
        console.log('Database Connected Successfully')
    }catch(error){
        console.log('Failed to Connect to DB: ', error.message);   
    }
}
module.exports = connect;