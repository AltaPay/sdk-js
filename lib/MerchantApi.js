/**
 * Connector for the AltaPay Merchant API
 *
 * @param username The API username for AltaPay
 * @param password The API user's password
 * @param url The url for the gateway (e.g. "testgateway.pensio.com")
 * @param factory {AltaPayFactory}
 * @param logger {Logger}
 * @param http {Http}
 * @constructor
 */
function MerchantApi(username, password, url, factory, logger, http) {
    this.username = username;
    this.password = password;
    this.url = url;

    this.factory = factory;
    this.logger = logger;
    this.http = http;
}


/**
 * @param request {PaymentRequest}
 */
MerchantApi.prototype.createPaymentRequest = function(request) {

};


/**
 * @param request {PaymentRequest}
 * @private
 */
MerchantApi.prototype.getBasicCreatePaymentRequestParameters = function(request) {
    var parameter = [];

    // mandatory arguments
    parameter.amount = request.amount; // TODO ensure formatting is correct

    // optional arguments
    parameter.sales_reconciliation_identifier = request.s
};