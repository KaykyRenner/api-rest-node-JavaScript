const express = require('express')
const router = express.Router();
//facilitando a ultilização de status
const {StatusCodes} = require('http-status-codes')
//importanto as rotas da cidade
const {cidadeController} = require('../controllers/index');
const {pessoaController} = require('../controllers/index');
const {usuarioController} = require('../controllers/index');
const {autheticade} = require('../shared/middlewares/middleware')
router.get('/',(req,res)=>{
    return res.send('olá dev');
    
});
router.get('/cidades/:id',autheticade,cidadeController.getByIdValidation,cidadeController.getByIdResultado)
router.put('/cidades/:id',autheticade,cidadeController.updateByIdValidation,cidadeController.updateByIdResultado)
router.get('/cidades',autheticade,cidadeController.getAllValidation,cidadeController.getAllResultados)
router.post('/cidades',autheticade,cidadeController.getSchemasValidation,cidadeController.getSchemasResultados)
router.delete('/cidades/:id',autheticade,cidadeController.deleteByIdValidation,cidadeController.deleteByIdResultado)


router.post('/pessoas',autheticade,pessoaController.getSchemasValidation,pessoaController.getSchemasResultados)
router.delete('/pessoas/:id',autheticade,pessoaController.deleteByIdValidation,pessoaController.deleteByIdResultado)
router.get('/pessoas',autheticade,pessoaController.getAllValidation,pessoaController.getAllResultados)
router.get('/pessoas/:id',autheticade,pessoaController.getByIdValidation,pessoaController.getByIdResultado)
router.put('/pessoas/:id',autheticade,pessoaController.updateByIdValidation,pessoaController.updateByIdResultado)

router.post('/cadastrar',usuarioController.singUpsValidation,usuarioController.singUpResultados)
router.post('/entrar',usuarioController.singInValidation,usuarioController.SingInResultados)

module.exports = router
