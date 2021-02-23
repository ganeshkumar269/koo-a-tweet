require("module-alias/register")

const registerKoo = require('@registerKoo')
const verifyKoo = require('@verifyKoo')
const getOTPFromMail = require('@getOTPFromMail')

const logger = require('@customLogger')({filename:__filename})

const timeout = (ms)=>{
    return new Promise(resolve=>setTimeout(resolve.bind(null),ms))
}

const authenticateKoo = ()=>{
    return registerKoo() //response fornat logs/registerKooLog
    .then(res=>res.json())
    .then(res=>{
        logger.debug("res: ", res)
        if(res.status == "INSTALLED"){
            logger.debug("OTP Req. sent successfully")
            return timeout(10000)
            .then(()=>{
                return getOTPFromMail()
                .then(data=>{
                    logger.debug("OTP: ", data)
                    return verifyKoo(data.otp,res.installationId)
                })
                .then(res=>res.json())
                .then(res=>{
                    logger.debug(res)
                    if(res.status == "VERIFIED"){
                        return {token:res.token}
                    }
                })
                .catch(err=>logger.debug(err))
            })
        }
    })
}

module.exports = authenticateKoo