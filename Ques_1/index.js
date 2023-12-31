const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const {getOrderedTrain} = require('./contoller/getTrain');
const {getToken} = require('./contoller/getToken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000,async ()=>{
    console.log('Server started at PORT 3000');

    app.get('/trains',getOrderedTrain);
   
// const token = getToken();
// console.log(token);
    //app.get('/token',getToken);
});
