const mongoose = require("mongoose");

//Database Connection
const dbConnect = ()=>{
    mongoose.connect('mongodb://localhost:27017/');
    const db = mongoose.connection;//acquire the connection to check if its successful
    db.on('error',console.error.bind(console,'error connecting to db'));//error
    //up and running then print the message
    db.once('open',function(){
        console.log('Successfully Connected to database');
})
}


module.exports = dbConnect;