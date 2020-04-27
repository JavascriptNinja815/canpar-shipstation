/**
 * src/shipstation_request.js
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
 * Class for basic HTTP header validation
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
const ValidationError = require('./errors/validation-error')

const validate_shipstation_request_headers = request => {
    // We do POST only?
    if (request.method !== 'POST') {
        return null
    }

    // Canpar account email address
    if (request.header('shipstation-email') === undefined) {
        return 'shipstation-email header not set'
    }

    // Canpar shipper id
    if (!request.header('shipstation-providerid')) {
        return 'shipstation-providerid header not set'
    }

    // Canpar shipper password
    if (!request.header('shipstation-providerpwd')) {
        return 'shipstation-providerpwd header not set'
    }

    // Are we in sandbox mode
    if (!request.header('shipstation-sandboxmode')) {
        return 'shipstation-sandboxmode header not set'
    }

    // Unqiue transaciton ID from shipstation
    /*if (!request.header('shipstation-transactionid')) {
        return 'shipstation-transactionid header not set'
    }*/

    return null
}

module.exports = app => {
    app.use((request, response, next) => {
        const error = validate_shipstation_request_headers(request)
        if (error) {
            throw new ValidationError(error)
        }

        request.canpar_email = request.header('shipstation-email')
        request.canpar_account_id = request.header('shipstation-providerid')
        request.canpar_account_pwd = request.header('shipstation-providerpwd')
        request.is_sandbox = request.header('shipstation-sandboxmode')
        //request.transaction_id = request.header('shipstation-transactionid')

        next()
    })
}
