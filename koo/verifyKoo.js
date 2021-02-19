require("module-alias/register")

let fetch = require('node-fetch')
let config = require('@config')

const verifyKoo = async (otp,userId)=>{

    let body = {
        "otp" : otp,
        "registerType" : "1",
        "userRegistrationId" : userId,
        "identifier": config.email,
    }
    
    return await fetch("https://www.kooapp.com/apiV1/registration-v2/verify", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "language": "te",
        "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "status": "null",
        "token": "null",
        "user_id": "null",
    },
    "referrer": "https://www.kooapp.com/feed",
    "referrerPolicy": "strict-origin-when-cross-origin",
    // "body": "{\"otp\":\""+ otp +"\",\"countryCode\":\"\",\"registerType\":1,\"userRegistrationId\":"+userId+",\"identifier\":\""+ config.email +"\"}",
    "body":JSON.stringify(body),
    "method": "POST",
    "mode": "cors"
    })
}


module.exports = verifyKoo