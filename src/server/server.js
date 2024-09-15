const express = require('express');
const app = express();
app.get('/',(req,res)=>{

    return res.send('olá dev')
})







module.exports = app
