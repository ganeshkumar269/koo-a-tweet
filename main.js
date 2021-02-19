require("module-alias/register")

const stream = require('@getTweetStream')
const kooTheTweet = require('@kooTheTweet')
const authenticateKoo = require('@authenticateKoo')

let token = "";

authenticateKoo()
.then(res=>{
    if(res.token){
        console.log("Authenticated with token ", res.token)
        token = res.token
    
        stream.then(stream=>{
            stream
            .on('data',data=>{
                try{
                    let json = JSON.parse(data) //look at tStreamLog for format of the data
                    console.log("Tweet Recieved: ",json.data.text)
                    kooTheTweet(json.data.text,token)
                    .then(res=>{
                        console.log("Response from kooTHeTweet ",res)
                        if(res.mode == "1")
                            token = res.token
                    })
                    .catch(err=>console.log("main.js koothetweet catch-err, ", err))
                }
                catch(err){
                    //Keep Listening
                }
            })
            .on('error',err=>{
                console.log(err)
                if (error.code === 'ETIMEDOUT')
                   stream.emit('timeout')
            })
        })
    }else{
        console.log("main.js Invalid Token")
    }
})
.catch(err=>console.log("main.js authenticate catch-err, ", err))
    

