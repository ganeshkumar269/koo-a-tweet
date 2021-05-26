require("module-alias/register")

const stream = require('@getTweetStream')
const kooTheTweet = require('@kooTheTweet')
const authenticateKoo = require('@authenticateKoo')
const logger = require('@logger')

let token = "";

authenticateKoo()
.then(res=>{
    if(res.token){
        logger.debug("Authenticated with token ", res.token)
        token = res.token
    
        stream.then(stream=>{
            stream
            .on('data',data=>{
                try{
                    let json = JSON.parse(data) //look at tStreamLog for format of the data
                    logger.debug("Tweet Recieved: ",json.data.text)
                    kooTheTweet(json.data.text,token)
                    .then(res=>{
                        logger.debug("Response from kooTHeTweet ",res)
                        if(res.mode == "1")
                            token = res.token
                    })
                    .catch(err=>logger.debug("main.js koothetweet catch-err, ", err))
                }
                catch(err){
                    //Keep Listening
                }
            })
            .on('error',err=>{
                logger.debug(err)
                if (error.code === 'ETIMEDOUT')
                   stream.emit('timeout')
            })
        })
    }else{
        logger.debug("main.js Invalid Token")
    }
})
.catch(err=>logger.debug("main.js authenticate catch-err, ", err))
    

