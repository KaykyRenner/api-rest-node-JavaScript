const express = require('express')
const router = express.Router();

//facilitando a ultilização de status
const {StatusCodes} = require('http-status-codes')
//importanto as rotas da cidade
const {cidadeController} = require('../controllers/index');

router.get('/',(req,res)=>{
    return res.send('olá dev');
    
});
router.get('/cidades/:id',cidadeController.getByIdValidation,cidadeController.getByIdResultado)
router.put('/cidades/:id',cidadeController.updateByIdValidation,cidadeController.updateByIdResultado)
router.get('/cidades',cidadeController.getAllValidation,cidadeController.getAllResultados)
router.post('/cidades',cidadeController.getSchemasValidation,cidadeController.getSchemasResultados)
router.delete('/cidades/:id',cidadeController.deleteByIdValidation,cidadeController.deleteByIdResultado)


module.exports = router
