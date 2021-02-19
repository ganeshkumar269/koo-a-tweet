require('dotenv').config()


module.exports = {
    consumer_key : process.env.consumer_key,
    consumer_secret : process.env.consumer_secret,
    bearer_token : process.env.bearer_token, 
    access_token_key : process.env.access_token_key,  
    access_token_secret : process.env.access_token_secret,
    phone_number : process.env.phone_number,
    email:process.env.email,
    gmailClientId:process.env.gmailClientId,
    gmailClientSecret:process.env.gmailClientSecret,
    gmailRedirectURI:process.env.gmailRedirectURI,
    gmailRefreshToken:process.env.gmailRefreshToken,
}