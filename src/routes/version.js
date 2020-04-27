/**
 * routes/version.js
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
 * Return the current Canpar webservice version request processor
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

const config = require('../config')
const canpar_api = require('../utils/canpar-api')

const send_successful_response = (result, request, response) => {
    response.status(200).send(result)
}

const get_version = request => {
    const data = {
        canpar_email: request.header('shipstation-email'),
        canpar_account_id: request.header('shipstation-providerid'),
        canpar_account_pwd: request.header('shipstation-providerpwd'),
        is_sandbox: request.header('shipstation-sandboxmode'),
    }

    return canpar_api.get_version(data)
}

const version = (request, response, next) => {
    get_version(request)
        .then((result) => send_successful_response(result, request, response))
        .catch(next)
}

module.exports = version
