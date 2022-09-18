const con     = require('../../config/db');
const moment  = require('moment')

const checkUser = async (username) => {
    return new Promise( (resolve, reject)=> {
        con.query("SELECT * FROM member WHERE email = '"+username+"' ", function(err, rows){
            if(err){
                reject({ status:'error', message:err.code })
            }
            resolve(rows)
        })
    });
}
module.exports = {
    checkUser
}