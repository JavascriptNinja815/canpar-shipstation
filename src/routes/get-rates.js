/**
 * routes/get-rates.js
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
 * Get shipping rate with specific shipping method request processor
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
    let rates

    if (result.processShipmentResult != null) {
        rates = [{
            shipping_amount: {
                amount: parseFloat(result.processShipmentResult.shipment.freight_charge) + parseFloat(result.processShipmentResult.shipment.fuel_surcharge) + parseFloat(result.processShipmentResult.shipment.handling),
            },
            debug_data: result.processShipmentResult.shipment,
        },]
    } else {
        rates = [{
            shipping_amount: {
                amount: -1, // Throw fatal error with invalid number
            },
            error_message: result.error,
            debug_data: result,
        },]
    }

    const data = {
        transaction_id: request.transaction_id,
        rates: rates,
    }
    response.status(200).send(data)
}

const perform_get_rates = request => {
    const data = {
        canpar_email: request.header('shipstation-email'),
        canpar_account_id: request.header('shipstation-providerid'),
        canpar_account_pwd: request.header('shipstation-providerpwd'),
        is_sandbox: request.header('shipstation-sandboxmode'),
    }

    // Prepare the request params
    const body = request.body

    const ship_from = body.ship_from
    const ship_to = body.ship_to

    const packages = request.body.packages

    let total_weight = 0.0

    const canpar_packages = []

    packages.forEach(function(item){
        total_weight += item.weight

        canpar_packages.push({
            'declared_value': 0,
            'height': item.height,
            'length': item.length,
            'width': item.width,
            'reported_weight': item.weight,
        })
    })

    const params = {
        'request': {
            'user_id': data.canpar_email,
            'password': data.canpar_account_pwd,
            'apply_association_discount': false, // We always mark this to NO in our magento implementation
            'apply_individual_discount': false, // We always mark this to NO in our magento implementation
            'apply_invoice_discount': false, // We always mark this to NO in our magento implementation
            'shipment': {
                'cod_type': 'N',
                'collect': true,
                'dg': 0, // This needs to be provided by shipstation but there is no documentation
                'handling': 0.0, // Shipstation does not seems to pass on the handling fee based on my understanding
                'handling_type': '$',
                'instruction': '',
                'nsr': 0, // No Signature Required?
                'premium': 'N',
                'reported_weight_unit': config.default_weight_unit,
                'send_email_to_delivery': true,
                'send_email_to_pickup': true, // We don't get email address
                'service_type': body.serviceCode,
                'shipper_num': data.canpar_account_id,
                'shipping_date': body.ship_datetime,
                'dimention_unit': config.default_dimentional_unit,
                'delivery_address': {
                    'address_line_1': ship_to.address_lines[0],
                    'city': ship_to.city_locality,
                    'country': ship_to.country_code,
                    'name': ship_to.first_name + ' ' + ship_to.last_name,
                    'email': ship_to.email,
                    'postal_code': ship_to.postal_code,
                    'province': ship_to.state_province,
                    'residential': ship_to.residential,
                },
                'pickup_address': {
                    'address_line_1': ship_from.address_lines[0],
                    'city': ship_from.city_locality,
                    'country': ship_from.country_code,
                    'name': ship_from.first_name + ' ' + ship_from.last_name,
                    'email': data.canpar_email,
                    'postal_code': ship_from.postal_code,
                    'province': ship_from.state_province,
                    'residential': ship_from.residential,
                },
                'packages': canpar_packages,
            },
        },
    }

    return canpar_api.get_rates(data, params)
}

const get_rates = (request, response, next) => {
    perform_get_rates(request)
        .then((result) => send_successful_response(result, request, response))
        .catch(next)
}

module.exports = get_rates
