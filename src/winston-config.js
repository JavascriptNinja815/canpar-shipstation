/* This code is based on dpd sample code */
const config = require('./config')
const winston = require('winston')

const logging_transports = [
    new winston.transports.Console({
        colorize: !config.use_sandbox,
        json: config.use_sandbox,
        stringify: config.use_sandbox,
    }),
]

const winston_config = {
    transports: logging_transports,
    meta: true,
    dynamicMeta: request => {
        return {
            use_sandbox: request.is_sandbox,
            account_email: request.canpar_email,
            account_password: request.canpar_account_pwd,
            shippingaccount: request.canpar_account_id,
            transaction_id: request.transaction_id,
        }
    },
}

winston.configure(winston_config)

module.exports = winston_config
