let fetch = require('node-fetch')
const cryptoRandomString = require('crypto-random-string')
const logger = require('@customLogger')({filename:__filename})

const createKoo = (kooBody,token)=>{ 
	let clientId = cryptoRandomString({length:10})

	let body = {
		contentClientId : "295f48d2-4cc3-40b4-a2f5-"+clientId,
		mediaType : "GENERIC",
		title : kooBody,
	}
	
	return fetch("https://www.kooapp.com/apiV1/ku", {
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
		"status": "VERIFIED",
		"token": token,
		"user_id": "null",
		},
		"referrer": "https://www.kooapp.com/create",
		"referrerPolicy": "strict-origin-when-cross-origin",
		// "body": "{\"contentClientId\":\"295f48d2-4cc3-40b4-a2f5-"+clientId+"\",\"mediaType\":\"GENERIC\",\"media\":{\"link\":\"\",\"linkTitle\":\"\",\"linkImage\":\"\",\"audioOpus\":\"\",\"audioMp3\":\"\",\"audioHls\":\"\",\"videoMp4\":\"\",\"videoHls\":\"\",\"imageUrl\":[],\"audiogramMp4\":\"\",\"meta\":{}},\"title\":\""+ kooBody +"\",\"parentKuId\":\"\",\"mediaText\":\"\",\"location\":\"\",\"charchaId\":null}",
		"body" : JSON.stringify(body),
		"method": "POST",
		"mode": "cors"
	})
	.then(res=>res.text())
	.then(res=>JSON.parse(res))
	.catch(err=>logger.debug("createKoo.js catch-err:",err))
}

module.exports = createKoo