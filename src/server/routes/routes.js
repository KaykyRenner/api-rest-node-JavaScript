const express = require('express')
const router = express.Router();

//facilitando a ultilização de status
const {StatusCodes} = require('http-status-codes')
//importanto as rotas da cidade
const {cidadeController} = require('../controllers/index');

router.get('/',(req,res)=>{
    return res.send('olá dev');
    
});
router.get('/cidades',cidadeController.getAllValidation,cidadeController.getAllResultados)
router.post('/cidades',cidadeController.GetVaiDaCerto,cidadeController.create)


module.exports = router
