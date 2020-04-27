/**
 * src/config.js
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
 * Base Config Controller
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

const config = {
    networks: {},
    port: 9000,
    use_sandbox: true,
    wsdl_rating: 'https://canpar.com/canshipws/services/CanparRatingService',
    wsdl_sandboxrating: 'https://sandbox.canpar.com/canshipws/services/CanparRatingService',
    wsdl_addon: 'https://canpar.com/canshipws/services/CanparAddonsService',
    wsdl_sandboxaddon: 'https://sandbox.canpar.com/canshipws/services/CanparAddonsService',
    wsdl_business: 'https://canpar.com/canshipws/services/CanshipBusinessService',
    wsdl_sandboxbusiness: 'https://sandbox.canpar.com/canshipws/services/CanshipBusinessService',
    account_email: '',
    account_password: '',
    shippingaccount: '',
    handling_type: 'fixed',
    default_width: 10,
    default_height: 10,
    default_length: 10,
    estimated_deliver_date_margin: 1,
    dg: 0, //Dangerous Goods
    cos: 0, //Chain Of Signature
    default_weight_unit: 'LB',
    default_dimentional_unit: 'IN',

}

module.exports = config
