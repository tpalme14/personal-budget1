const express = require('express');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");
const nameModel = require("./models/schema");

const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017/budget';

app.use(express.json()); 
app.use('/', express.static('public'));

mongoose.connect(url)
    .then(() => {
        console.log("Connected to the database!");
        nameModel.find({})
            .then((data) => {
                // console.log(data)
                // mongoose.connection.close()
            })
            .catch((connectionError) => {
                console.log(connectionError)
            });       
    })
    .catch((connectionError) => {
        console.log("Error making the connection:",connectionError);
    })

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', async (req, res) => {
    try {
        const budgets = await nameModel.find({});
        res.json({ myBudget: budgets });
    } catch (error) {
        console.log("Error fetching budget data:", error);
    }
});

app.post('/budget', async (req, res) => {
    const { id, color, title, budget } = req.body;
    const newBudget = new nameModel({
        id,
        color,
        title,
        budget
    });
    try {
        await newBudget.save();
        console.log("Budget entry created successfully!" );
    } catch (error) {
        console.log("Error creating budget entry:", error);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});