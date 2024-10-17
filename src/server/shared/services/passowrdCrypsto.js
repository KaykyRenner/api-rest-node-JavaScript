const { hash, genSalt, compare } = require("bcryptjs")

const SaltRandoms = 8;

const hashPassowrd = async(passowrd) =>{
    const saltGeneration = await genSalt(SaltRandoms)

    return await hash(passowrd, saltGeneration)
    
}

const verifyPassowrd = async(passowrd, hashedPassowrd)=>{
    return await compare(passowrd, hashedPassowrd)
}
module.exports = {hashPassowrd, verifyPassowrd}