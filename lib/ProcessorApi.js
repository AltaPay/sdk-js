
/**
 * Connector for the AltaPay Processor API.
 *
 * @param username The API username for AltaPay
 * @param password The API user's password0
 * @param url The url for the gateway (e.g. "testgateway.altapaysecure.com")
 * @param factory {AltaPayFactory}
 * @param logger {Logger}
 * @param http {Http}
 * @param xml {Xml}
 * @param responseFactory {ResponseFactory}
 * @param base64 {Base64}
 * @param baseApi {BaseApi}
 * @extends BaseApi
 * @constructor
 */
function ProcessorApi(username, password, url, factory, logger, http, xml, responseFactory, base64, baseApi) {
    this.username = username;
    this.password = password;
    this.url = url;

    this.factory = factory;
    this.logger = logger;
    this.http = http;
	this.xml = xml;
	this.responseFactory = responseFactory;
	this.base64 = base64;

	ObjectHelper.extend(this, baseApi);
}

/**
 * @param request {InitiatePaymentRequest}
 * @return {InitiatePaymentResponse}
 */
ProcessorApi.prototype.initiatePayment = function(request) {
	var result = this.http.post(this.url+'/processor.php/API/initiatePayment', request.toHash(), this.getHeaders());
	var responseObject = this.xml.deserialize(result);
	return this.responseFactory.getInitiatePaymentResponse(responseObject)
};

/**
 * @param request {Verify3dSecureRequest}
 * @return {InitiatePaymentResponse}
 */
ProcessorApi.prototype.verify3dSecure = function(request) {
	var result = this.http.post(this.url+'/processor.php/API/verify3dSecure', request.toHash(), this.getHeaders());
	var responseObject = this.xml.deserialize(result);
	return this.responseFactory.getInitiatePaymentResponse(responseObject)
};