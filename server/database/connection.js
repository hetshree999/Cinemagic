const mongoose = require("mongoose");
require('dotenv').config();
mongoose.set("strictQuery", false);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{
    useNewUrlParser: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("connection established!");
})

