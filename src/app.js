/**
 * src/app.js
 *
 * Nodejs Project
 *
 * @category  Shipstation
 * @package   Shipstation_Canpar
 * @author    Collinsharper Development Team <dev@collinsharper.com>
 * @copyright 2018 Collinsharper Software LLC.
 * @link      http://www.collinsharper.com/
 *
 */
/**
 * Main processor
 *
 * Nodejs Project
 *
 * @category  Shipstation
 * @package   Shipstation_Canpar
 * @author    Collinsharper Development Team <dev@collinsharper.com>
 * @copyright 2018 Collinsharper Software LLC.
 * @link      http://www.collinsharper.com/
 *
 */

const body_parser = require('body-parser')
const cors = require('cors')
const express = require('express')
const express_winston = require('express-winston')
const winston_config = require('./winston-config')

const app = express()

// attach the shipstation carrierapi headers
// to the request object for future use
require('./shipstation_request')(app)

app.use(cors())
app.use(express_winston.logger(winston_config))
app.use(body_parser.json())

// Add routes
require('./app-routes')(app)

app.use(express_winston.errorLogger(winston_config))

// We need to get better error handling

module.exports = app
