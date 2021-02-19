require("module-alias/register")
//ref: https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/api-reference/get-tweets-search-stream

let config = require('@config')
let needle  = require('needle')
let url = new URL("https://api.twitter.com/2/tweets/search/stream")

const getTweetStream = async ()=>{
    return await needle.get(url.toString(), {
                        "headers" : {
                            "User-Agent": "v2FilterStreamJS",
                            "Authorization": `Bearer ${config.bearer_token}`
                        },
                        "timeout" : 20000
                    })
}

module.exports = getTweetStream()