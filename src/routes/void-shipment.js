/**
 * routes/void-shipment.js
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
 * Void shipment request processor
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
    let shipment

    if (result.error == null) {
        shipment = [{
            debug_data: result,
        },]
    } else {
        shipment = [{
            error_message: result.error,
            debug_data: result,
        },]
    }

    const data = {
        transaction_id: request.transaction_id,
        result: shipment,
    }

    response.status(200).send(data)
}

const void_shipment = request => {
    const data = {
        canpar_email: request.header('shipstation-email'),
        canpar_account_id: request.header('shipstation-providerid'),
        canpar_account_pwd: request.header('shipstation-providerpwd'),
        is_sandbox: request.header('shipstation-sandboxmode'),
    }

    // Prepare the request params
    const body = request.body

    const params = {
        'request': {
            'user_id': data.canpar_email,
            'password': data.canpar_account_pwd,
            'id': body.shipment_id, // This is the ID coming from createShipment
        },
    }

    return canpar_api.void_shipment(data, params)
}

const voidshipment = (request, response, next) => {
    void_shipment(request)
        .then((result) => send_successful_response(result, request, response))
        .catch(next)
}

module.exports = voidshipment
