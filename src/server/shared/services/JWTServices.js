const jwt = require('jsonwebtoken')
const sing = (data)=>{
    if(!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND'
    return jwt.sign(data,process.env.JWT_SECRET)
}
const verify = ()=>{

}
module.exports = {sing,verify}