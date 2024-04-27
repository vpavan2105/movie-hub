const express = require('express');
const app = express();
const cors = require('cors');
const { connectionToDB } = require('./config/dbconfig');
const port = 3000;

app.use(express.json());
app.use(cors())

app.listen(port, async ()=> {
    await connectionToDB()
})