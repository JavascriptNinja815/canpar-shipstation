/**
 * routes/get-label.js
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
 * Get shipping label request processor
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
    let label

    if (result.error == null) {
        label = [{
            labels: result.labels, // This is in PNG format
            debug_data: result,
        },]
    } else {
        label = [{
            error_message: result.error,
            debug_data: result,
        },]
    }

    const data = {
        transaction_id: request.transaction_id,
        label: label,
    }

    response.status(200).send(result)
}

const performn_get_label = request => {
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
            'thermal': false, // We always mark this to NO in our magento implementation
            'id': body.shipment_id, // This is the ID coming from createShipment
        },
    }

    return canpar_api.get_label(data, params)
}

const get_label = (request, response, next) => {
    performn_get_label(request)
        .then((result) => send_successful_response(result, request, response))
        .catch(next)
}

module.exports = get_label
