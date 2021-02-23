let {google} = require('googleapis')
let config = require('@config')
const gmail = google.gmail('v1');

const logger = require('@customLogger')({filename:__filename})

const oAuth2Client = new google.auth.OAuth2(config.gmailClientId,config.gmailClientSecret,config.gmailRedirectURI)
oAuth2Client.setCredentials({refresh_token:config.gmailRefreshToken})
google.options({auth:oAuth2Client})

let getMessageList = async ()=>{
    let res = await gmail.users.messages.list({
        includeSpamTrash:true,
        userId:config.email,
    })
    return res    
}
let getMessage = async (id)=>{
    let res = await gmail.users.messages.get({
        userId:config.email,
        id:id,
    })
    return res
}

const getOTPfromData = (data) =>{
    return {otp:data.snippet.split(" ")[1]}
}

const getOTPFromMail = async ()=>{
    return getMessageList()
    .then(res=>{
        let data = res.data
        logger.debug(data)
        return data.messages[0]
    })
    .then(id=>{
        logger.debug("getOTPFromMail.js Id received: ",id)
        return getMessage(id.id)
    })
    .then(data=>{
        logger.debug("getOTPFromMail.js Data From GetMessage: ",data.data)
        return getOTPfromData(data.data)
    })
}

module.exports = getOTPFromMail