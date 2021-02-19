require("module-alias/register")

const registerKoo = require('@registerKoo')
const verifyKoo = require('@verifyKoo')
const getOTPFromMail = require('@getOTPFromMail')


const timeout = (ms)=>{
    return new Promise(resolve=>setTimeout(resolve.bind(null),ms))
}

const authenticateKoo = ()=>{
    return registerKoo() //response fornat logs/registerKooLog
    .then(res=>res.json())
    .then(res=>{
        console.log("res: ", res)
        if(res.status == "INSTALLED"){
            console.log("OTP Req. sent successfully")
            return timeout(10000)
            .then(()=>{
                return getOTPFromMail()
                .then(data=>{
                    console.log("OTP: ", data)
                    return verifyKoo(data.otp,res.installationId)
                })
                .then(res=>res.json())
                .then(res=>{
                    console.log(res)
                    if(res.status == "VERIFIED"){
                        return {token:res.token}
                    }
                })
                .catch(err=>console.log(err))
            })
        }
    })
}

module.exports = authenticateKoo