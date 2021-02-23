const path = require('path')
const log4js = require('log4js')

const prettyLevel = (level) => level.length > 4 ? level : level + " "
const getFileName = (fname) => fname ? "[" + path.basename(fname)  + "] " : ""


const logger = (conf) =>{
    const LNAME = conf.logname ? conf.LNAME : "default.log"
    
    log4js.addLayout('customLayout', config => function (logEvent) {
        return  "[" + logEvent.startTime.toISOString()+"] " + 
                "[" + prettyLevel(logEvent.level.toString()) + "] " +  
                getFileName(conf.filename) + 
                logEvent.data.toString()
    })
    
    log4js.configure({
        appenders: {
            customLogs: { type: 'file', filename: LNAME ,layout: { type: 'customLayout'} },
            console: { type: 'console'}
        },
        categories: {
            custom: { appenders: ['customLogs'], level: 'ALL' },
            default: { appenders: ['console', 'customLogs'], level: 'ALL' }
        }
    })
    return log4js.getLogger()
}

module.exports = logger 


