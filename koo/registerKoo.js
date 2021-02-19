require("module-alias/register")

let fetch = require('node-fetch')
const config =require('@config')

const registerKoo = async ()=>{
    return await fetch("https://www.kooapp.com/apiV1/registration-v2", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "language": "en",
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
      "body": "{\"identifier\":\""+config.email+"\",\"source\":\"organic\",\"registerType\":1,\"lang\":\"en\",\"deviceOs\":\"WEB\",\"utmParams\":\"\"}",
      "method": "POST",
      "mode": "cors"
    })
}

module.exports = registerKoo