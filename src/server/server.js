require('./shared/services/traducoesYup')
const express = require('express');
const app = express();
const router = require('./routes/routes')
require('dotenv').config()

const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/meubanco';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));



app.use(express.json())
app.use(router)

module.exports = {app};

