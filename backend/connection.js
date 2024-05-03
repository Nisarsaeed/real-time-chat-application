const mongoose = require('mongoose');
require('dotenv').config();

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.7h80a4c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url, {
    // useNewUrlParser: true,
    //  useUnifiedTopology: true
}).then(()=>console.log('connected to db')).catch((e)=>console.log('error connecting to db', e));