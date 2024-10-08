const express = require('express')
const router = express.Router();
//facilitando a ultilização de status
const {StatusCodes} = require('http-status-codes')
//importanto as rotas da cidade
const {cidadeController} = require('../controllers/index');
const {pessoaController} = require('../controllers/index');
router.get('/',(req,res)=>{
    return res.send('olá dev');
    
});
router.get('/cidades/:id',cidadeController.getByIdValidation,cidadeController.getByIdResultado)
router.put('/cidades/:id',cidadeController.updateByIdValidation,cidadeController.updateByIdResultado)
router.get('/cidades',cidadeController.getAllValidation,cidadeController.getAllResultados)
router.post('/cidades',cidadeController.getSchemasValidation,cidadeController.getSchemasResultados)
router.delete('/cidades/:id',cidadeController.deleteByIdValidation,cidadeController.deleteByIdResultado)


router.post('/pessoas',pessoaController.getSchemasValidation,pessoaController.getSchemasResultados)
router.delete('/pessoas/:id',pessoaController.deleteByIdValidation,pessoaController.deleteByIdResultado)
router.get('/pessoas',pessoaController.getAllValidation,pessoaController.getAllResultados)
router.get('/pessoas/:id',pessoaController.getByIdValidation,pessoaController.getByIdResultado)
router.put('/pessoas/:id',pessoaController.updateByIdValidation,pessoaController.updateByIdResultado)
module.exports = router
