const config = require('../config')
const canpar_api = require('../utils/canpar-api')

const send_successful_response = (result, request, response) => {
    let tracking

    if (result.TrackingResult == null) {
        tracking = [{
            tracking_data: result.TrackingResult,
            debug_data: result,
        },]
    } else {
        tracking = [{
            error_message: result.error,
            debug_data: result,
        },]
    }

    const data = {
        transaction_id: request.transaction_id,
        tracking: tracking,
    }

    response.status(200).send(data)
}

const track_shipment = request => {
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
            'barcode': body.tracking_no, // We need the tracking no return from Create Shipment method
            'track_shipment': true,
        },
    }

    return canpar_api.tracking(data, params)
}

const trackshipment = (request, response, next) => {
    track_shipment(request)
        .then((result) => send_successful_response(result, request, response))
        .catch(next)
}

module.exports = trackshipment
