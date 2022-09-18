const express           = require('express');
const router            = express.Router();
const reply             = require('../helpers/response')
const moment            = require('moment')
const encrypter         = require('object-encrypter');
const engineCrypt       = encrypter('F2FpRoERP321', {ttl: true});
const auth              = require('../helpers/authHelper')
const generalConfig     = require('../../assets/generalConfig.json');
const awardsConfig      = require('../../assets/awards.json');

router.get('/sys', async (req, res)=> {
    try{
        return reply.send(res, "OK")
    }
    catch(error){
        return reply.errorInternalServer(res,error)
    }
})

router.get('/ui-menu', async (req, res)=> {
    try{
        return reply.send(res, generalConfig.menu)
    }
    catch(error){
        return reply.errorInternalServer(res,error)
    }
})

router.get('/awards', async (req, res)=> {
    try{
        return reply.send(res, awardsConfig.awards)
    }
    catch(error){
        return reply.errorInternalServer(res,error)
    }
})

module.exports = router;