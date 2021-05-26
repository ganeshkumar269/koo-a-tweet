const { configure, getLogger } = require("log4js");
const logger = getLogger();
logger.level = "debug";

configure({
    appenders: {
        cheese  : { type: "file", filename: "./logs/mainLog.log" }, //assuming running on unix systems
        console : { type: "stdout"}
    },
    categories: {
        default: { appenders: ["cheese","console"], level: "debug" }
    }
})

module.exports = logger