const mongoose = require("mongoose");
const nameModel = require("./models/schema");

const url = 'mongodb://localhost:27017/budget';

mongoose.connect(url)
    .then(() => {
        console.log("Connected to the database!");
        nameModel.find({})
            .then((data) => {
                console.log(data)
                mongoose.connection.close()
            })
            .catch((connectionError) => {
                console.log(connectionError)
            });
        let newData = new nameModel({id})        
    })
    .catch((connectionError) => {
        console.log("Error making the connection:",connectionError);
    })