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
 * @param base64 {Base64}
 * @param baseApi {BaseApi}
 * @extends BaseApi
 * @constructor
 */
function MerchantApi(username, password, url, factory, logger, http, dateHelper, xml, responseFactory, base64, baseApi) {
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

	ObjectHelper.extend(this, baseApi);
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
	var result = this.http.post(this.url+'/merchant/API/createPaymentRequest', request.toHash(), this.getAuthorizationHeader());
	var responseObject = this.xml.deserialize(result);
	return this.responseFactory.getPaymentRequestResponse(responseObject)
};

/**
 * @param request {CaptureRequest}
 * @return {CaptureResponse}
 */
MerchantApi.prototype.capture = function(request)
{
	var result = this.http.post(this.url+'/merchant/API/captureReservation',request.toHash(), this.getAuthorizationHeader());
	var responseObject = this.xml.deserialize(result);

	return this.responseFactory.getCaptureResponse(responseObject);
}

/**
 * @param request {RefundRequest}
 * @return {RefundResponse}
 */
MerchantApi.prototype.refund = function(request)
{
	var result = this.http.post(this.url+'/merchant/API/refundCapturedReservation',request.toHash(), this.getAuthorizationHeader());
	var responseObject = this.xml.deserialize(result);

	return this.responseFactory.getRefundResponse(responseObject);
}

/**
 * @param request {ReleaseRequest}
 * @return {ReleaseResponse}
 */
MerchantApi.prototype.release = function(request)
{
	var result = this.http.post(this.url+'/merchant/API/releaseReservation',request.toHash(), this.getAuthorizationHeader());
	var responseObject = this.xml.deserialize(result);

	return this.responseFactory.getReleaseResponse(responseObject);
}

/**
 * @param request {ChargeRequest}
 * @return {ChargeResponse}
 */
MerchantApi.prototype.chargeSubscription = function(request)
{
	var result = this.http.post(this.url+'/merchant/API/chargeSubscription',request.toHash(), this.getAuthorizationHeader());
	var responseObject = this.xml.deserialize(result);

	return this.responseFactory.getChargeResponse(responseObject);
}

/**
 * @param request {ChargeRequest}
 * @return {ChargeResponse}
 */
MerchantApi.prototype.reserveSubscriptionCharge = function(request)
{
	var result = this.http.post(this.url+'/merchant/API/reserveSubscriptionCharge',request.toHash(), this.getAuthorizationHeader());
	var responseObject = this.xml.deserialize(result);

	return this.responseFactory.getChargeResponse(responseObject);
}

/**
 * @param xml {string}
 * @return {CallbackResponse}
 */
MerchantApi.prototype.parseCallbackXml = function(xml)
{
	var responseObject = this.xml.deserialize(xml);

	return this.responseFactory.getCallbackResponse(responseObject);
}


/**
 * @param request {PaymentsRequest}
 * @return {PaymentsResponse}
 */
MerchantApi.prototype.getPayments = function(request)
{
	var result = this.http.post(this.url+'/merchant/API/transactions',request.toHash(), this.getAuthorizationHeader());
	var responseObject = this.xml.deserialize(result);

	return this.responseFactory.getPaymentsResponse(responseObject);
}