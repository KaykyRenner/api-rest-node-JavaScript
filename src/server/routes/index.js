const express = require('express')
const router = express.Router();
const {StatusCodes} = require('http-status-codes')
router.get('/',(req,res)=>{

    return res.send('olá dev');
});

router.post('/teste', (req,res) => {
    console.log(req.body)
    return res.status(StatusCodes.CREATED).json(req.body)
});

module.exports = router
