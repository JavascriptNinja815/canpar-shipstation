/**
 * src/app-routes.js
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
 * Routing Controller
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

module.exports = app => {
    app.get('/', require('./routes/index'))
    app.get('/ping', require('./routes/ping'))
    app.post('/getrates', require('./routes/get-rates'))
    app.post('/processshipment', require('./routes/processshipment'))
    app.post('/createlabel', require('./routes/get-label'))
    app.post('/voidshipment', require('./routes/void-shipment'))
    app.post('/createmanifest', require('./routes/create-manifest')) // Todo: Need to discuss with Shipstation
    app.post('/track', require('./routes/track'))
    app.post('/version', require('./routes/version'))

    app.all('*', require('./routes/catch-all'))
}
