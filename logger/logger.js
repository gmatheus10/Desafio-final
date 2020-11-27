const winston = require("winston");
const { createLogger, transports, format } = winston;
const { combine, timestamp, label, printf } = format;
const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = createLogger({
	transports: [
		new transports.Console({
			level: "silly",
			format: combine(label({ label: "desafio-final" }), timestamp(), myFormat),
		}),
		new transports.File({
			filename: "desafio-final.log",
			level: "silly",
			format: combine(label({ label: "desafio-final" }), timestamp(), myFormat),
		}),
	],
});

module.exports = logger;
