const express 			= require('express');
const router  			= express.Router();
const moment            = require('moment')
const encrypter         = require('object-encrypter');
const engineCrypt       = encrypter('F2FpRoERP321', {ttl: true});
const bcrypt            = require('bcrypt');
const salt              = bcrypt.genSaltSync(10);
const reply             = require('../helpers/response')
const generalHelper     = require('../helpers/generalHelper')
const authModel         = require('../model/authModel');

const checkUserLogin = async (req, res) => {
    try{
        const checkDBUser   = await authModel.checkUser(req.body.email)
        if(checkDBUser.length > 0){
            const expireTime    = parseInt(moment().format('x')) + (30*60*1000)
            const dataToEncrypt = { profile:checkDBUser[0], expireTime }
            const response = {
                status: 'LOGIN_SUCCESS',
                token: engineCrypt.encrypt(dataToEncrypt, 1800000) // 30 minutes
            };
            return reply.send(res, response)
        }else{
            return reply.sendMessage(res, 'USER_NOT_FOUND')
        }
    }
    catch(err){
        res.status(500).send({message:`Internal Server Error`})
    }
}

const checkExistingUser = async (req) => {
    try{
        const username = req.body.username || req.body.email
        const checkUsername = await authModel.checkUser(username)
        const data = { isUserNameExist:false, isEmailExist:false, isPhoneExist:false }
        if(checkUsername.length > 0){
            data.isUserNameExist = true
        }
        // check email
        const checkEmail    = await authModel.checkEmail(req.body.email)
        if(checkEmail.length > 0){
            data.isEmailExist = true
        }
        // check phone
        if(req.body.phone){
            const msisdn        = generalHelper.msisdnFormat(req.body.phone)
            const checkPhone    = await authModel.checkPhone(msisdn)
            if(checkPhone.length > 0){
                data.isPhoneExist = true
            }
        }
        return data
    }catch(error){
        throw new Error(error)
    }
}

module.exports = {
    checkExistingUser,
    checkUserLogin
}