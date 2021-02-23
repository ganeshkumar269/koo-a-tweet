require("module-alias/register")

const createKoo = require('@createKoo')
const authenticateKoo = require('@authenticateKoo')
const logger = require('@customLogger')({filename:__filename})

//mode="0" if success in first attempt
//mode="1" success in second attempt with a token in response

const kooTheTweet = (tweet,token)=>{
    return createKoo(tweet,token)
    .then(res=>{
        if(res.status == "failed"){
            logger.debug("First Attempt to Koo Failed, Trying to authenticate")
            return authenticateKoo()
            .then(res=>{
                return createKoo(tweet,res.token)
                .then(d=>{
                    d.mode = "1"
                    d.token = res.token
                    return d
                })
            })
            .catch(err=>logger.debug("kooTheTweet catch-err: ",err))
        }
        logger.debug("First Attempt to Koo Success")
        res.mode="0"
        return res
    })
}


module.exports = kooTheTweet