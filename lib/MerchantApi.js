/**
 * Connector for the AltaPay Merchant API
 *
 * @param username The API username for AltaPay
 * @param password The API user's password
 * @param url The url for the gateway (e.g. "testgateway.pensio.com")
 * @param factory {AltaPayFactory}
 * @param logger {Logger}
 * @param http {Http}
 * @param dateHelper {DateHelper}
 * @param xml {Xml}
 * @param responseFactory {ResponseFactory}
 * @constructor
 */
function MerchantApi(username, password, url, factory, logger, http, dateHelper, xml, responseFactory, base64) {
	this.username = username;
	this.password = password;
	this.url = url;

	this.factory = factory;
	this.logger = logger;
	this.http = http;
	this.dateHelper = dateHelper;
	this.xml = xml;
	this.responseFactory = responseFactory;
	this.base64 = base64;
}

/**
 * Checks of possible to login with username and password
 * @returns {boolean}
 */
MerchantApi.prototype.login = function() {
	var xmlStr = this.http.get(this.url+'/merchant/API/login', {}, this.getAuthorizationHeader());
	var xmlObj = this.xml.deserialize(xmlStr);
	return "OK" == xmlObj.Body.Result;
};

/**
 * @param request {PaymentRequest}
 * @return {PaymentRequestResponse}
 */
MerchantApi.prototype.createPaymentRequest = function(request) {
	var result = this.http.get(this.url+'/merchant/API/createPaymentRequest', request.toHash(), this.getAuthorizationHeader());
	var responseObject = this.xml.deserialize(result);
	return this.responseFactory.getPaymentRequestResponse(responseObject)
};

/**
 * @param request {CaptureRequest}
 * @return {CaptureResponse}
 */
MerchantApi.prototype.capture = function(request)
{
	var result = this.http.post(this.url+'/merchant/API/captureReservation',request.toHash());
	var responseObject = this.xml.deserialize(result);

	return this.responseFactory.getCaptureResponse(responseObject);
}

/**
 * @param request {RefundRequest}
 * @return {RefundResponse}
 */
MerchantApi.prototype.refund = function(request)
{
	var result = this.http.post(this.url+'/merchant/API/refundCapturedReservation',request.toHash());
	var responseObject = this.xml.deserialize(result);

	return this.responseFactory.getRefundResponse(responseObject);
}

/**
 * @param request {ReleaseRequest}
 * @return {ReleaseResponse}
 */
MerchantApi.prototype.release = function(request)
{
	var result = this.http.post(this.url+'/merchant/API/releaseReservation',request.toHash());
	var responseObject = this.xml.deserialize(result);

	return responseFactory.getReleaseResponse(responseObject);
}


/**
 *
 * @return {string}
 * @private
 */
MerchantApi.prototype.getAuthorizationHeader = function() {
	return {'Authorization': "Basic " + this.base64.encode(this.username +':'+ this.password)};
}

