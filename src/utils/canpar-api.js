/**
 * utils/canpar-api.js
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
 * Canpar API Helper class
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
const soapRequest = require('soap')

// Return API Version
const get_version = (data) => {
    let base_url = config.wsdl_sandboxrating

    if (!data.is_sandbox) {
        base_url = config.wsdl_rating
    }

    base_url = base_url + '?wsdl'

    const output = new Promise(function(resolve, reject) {

        soapRequest.createClient(base_url, function(err, client) {
            if(err) throw new Error(err)

            const args = {}

            client.getVersion(args, function(err, result) {
                if(err) reject(err)

                if(!result) {
                    reject('no response')
                }

                const data = result.return.version
                resolve(data)
            })
        })
    })

    return output
}

// Get Shipping Rate
const get_shipping_rate = (data, params) => {
    let base_url = config.wsdl_sandboxrating

    if (!data.is_sandbox) {
        base_url = config.wsdl_rating
    }

    base_url = base_url + '?wsdl'

    const output = new Promise(function(resolve, reject) {

        soapRequest.createClient(base_url, function(err, client) {
            if(err) throw new Error(err)

            client.rateShipment(params, function(err, result) {
                if(err) reject(err)

                if(!result) {
                    reject('no response')
                }

                resolve(result.return)
            })
        })
    })

    return output
}

// Post the Shipment to Canpar
const process_shipment = (data, params) => {
    let base_url = config.wsdl_sandboxbusiness

    if (!data.is_sandbox) {
        base_url = config.wsdl_business
    }

    base_url = base_url + '?wsdl'

    const output = new Promise(function(resolve, reject) {

        soapRequest.createClient(base_url, function(err, client) {
            if(err) throw new Error(err)

            client.processShipment(params, function(err, result) {
                if(err) reject(err)

                if(!result) {
                    reject('no response')
                }

                resolve(result.return)
            })
        })
    })

    return output
}

// Collect Shipping Label
const get_label = (data, params) => {
    let base_url = config.wsdl_sandboxbusiness

    if (!data.is_sandbox) {
        base_url = config.wsdl_business
    }

    base_url = base_url + '?wsdl'

    const output = new Promise(function(resolve, reject) {

        soapRequest.createClient(base_url, function(err, client) {
            if(err) throw new Error(err)

            client.processShipment(params, function(err, result) {
                if(err) reject(err)

                if(!result) {
                    reject('no response')
                }

                resolve(result.return)
            })
        })
    })

    return output
}

// Void Shipment
const void_shipment = (data, params) => {
    let base_url = config.wsdl_sandboxbusiness

    if (!data.is_sandbox) {
        base_url = config.wsdl_business
    }

    base_url = base_url + '?wsdl'

    const output = new Promise(function(resolve, reject) {

        soapRequest.createClient(base_url, function(err, client) {
            if(err) throw new Error(err)

            client.voidShipment(params, function(err, result) {
                if(err) reject(err)

                if(!result) {
                    reject('no response')
                }

                resolve(result.return)
            })
        })
    })

    return output
}

// Tracking information
const tracking = (data, params) => {
    let base_url = config.wsdl_sandboxaddon

    if (!data.is_sandbox) {
        base_url = config.wsdl_addon
    }

    base_url = base_url + '?wsdl'

    const output = new Promise(function(resolve, reject) {

        soapRequest.createClient(base_url, function(err, client) {
            if(err) throw new Error(err)

            client.trackByBarcode(params, function(err, result) {
                if(err) reject(err)

                if(!result) {
                    reject('no response')
                }

                resolve(result.return)
            })
        })
    })

    return output
}

module.exports = {
    get_version: get_version,
    get_rates: get_shipping_rate,
    process_shipment: process_shipment,
    get_label: get_label,
    void_shipment: void_shipment,
    tracking: tracking,
}
