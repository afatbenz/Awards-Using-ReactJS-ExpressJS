const express           = require('express');
const router            = express.Router();
const reply             = require('../helpers/response')
const authHelper        = require('../helpers/authHelper')
const authModel         = require('../model/authModel');
const moment            = require('moment')
const encrypter         = require('object-encrypter');
const engineCrypt       = encrypter('F2FpRoERP321', {ttl: true});
const bcrypt            = require('bcrypt');
const salt              = bcrypt.genSaltSync(10);

const actionLogin = async (req, res)=> {
    try{
        if(!req.body.email){
            return reply.badParameter(res, 'email')
        }
        await authHelper.checkUserLogin(req, res)
    }
    catch(err){
        return reply.errorInternalServer(res,err)
    }
}
router.post('/login', actionLogin)

module.exports = router;