/**
 * routes/create-manifest.js
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
 * Create Manifest request processor
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

// TODO: Please discuss with Shipstation on how they want to call this function.

const config = require('../config')
const canpar_api = require('../utils/canpar-api')

const send_successful_response = (result, request, response) => {

    response.status(200).send('TODO: Create Manifest')
}

const process_manifest = request => {
    const data = {
        canpar_email: request.header('shipstation-email'),
        canpar_account_id: request.header('shipstation-providerid'),
        canpar_account_pwd: request.header('shipstation-providerpwd'),
        is_sandbox: request.header('shipstation-sandboxmode'),
    }

    // Prepare the request params
    const body = request.body

    return true
}

const createmanifest = (request, response, next) => {
    process_manifest(request)
        .then((result) => send_successful_response(result, request, response))
        .catch(next)
}

module.exports = createmanifest
