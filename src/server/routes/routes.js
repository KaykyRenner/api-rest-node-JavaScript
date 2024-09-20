const express = require('express')
const router = express.Router();

//facilitando a ultilização de status
const {StatusCodes} = require('http-status-codes')
//importanto as rotas da cidade
const {cidadeController} = require('../controllers/index')

router.get('/',(req,res)=>{
    return res.send('olá dev');
    
});

router.post('/cidadesCreate',cidadeController.validationCreate,cidadeController.validationQuery,cidadeController.create)

module.exports = router
