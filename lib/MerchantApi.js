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
 * @return {Object}
 */
MerchantApi.prototype.createPaymentRequest = function(request) {
	var parameters = this.getBasicCreatePaymentRequestParameters(request);

	// mandatory arguments
	parameters.amount = request.amount; // TODO ensure formatting is correct
	parameters.shop_orderid = request.shop_orderid;

	// optional arguments
	parameters.sales_reconciliation_identifier = request.salesReconciliationIdentifier;
	parameters.sales_invoice_number = request.salesInvoiceNumber;
	parameters.sales_tax = request.salesTax;
	parameters.shipping_method = request.shippingType;

	if (request.customerCreatedDate != null) {
		parameters.customer_created_date = this.dateHelper.formatDate('Y-m-d', request.customerCreatedDate);
	}
	parameters.organisation_number = request.organisationNumber;
	parameters.account_offer = request.accountOffer;

	// customer info
	parameters.customer_info = request.customerInfo.toHash();

	// order lines
	this.addOrderLines(request, parameters);

	var xmlStr = this.http.get(this.url+'/merchant/API/createPaymentRequest', parameters, this.getAuthorizationHeader());
	return this.xml.deserialize(xmlStr);
};

/**
 *
 * @param request {CaptureRequest}
 * @return {CaptureResponse}
 */
MerchantApi.prototype.capture = function(request)
{
	var result = this.http.post(this.url+'/merchant/API/captureReservation',request.toHash());
	var resultObject = this.xml.deserialize(result);

	return responseFactory.getCaptureResponse(resultObject);
}


/**
 * @param request {PaymentRequestBase}
 * @return {Object}
 * @private
 */
MerchantApi.prototype.getBasicCreatePaymentRequestParameters = function(request) {
	var parameters = {};

	// mandatory arguments
	parameters.terminal = request.terminal;
	parameters.shop_orderid = request.shopOrderId;
	parameters.currency = request.currency;

	// config
	parameters.config = request.requestConfig.toHash();

	// optional arguments
	parameters.language = request.language;
	parameters.transaction_info = request.paymentInfos;
	parameters.type = request.authType;
	parameters.ccToken = request.creditCardToken;
	parameters.cookie = request.cookie;

	return parameters;
};

/**
 * @param request {PaymentRequest}
 * @param parameters {Object}
 * @private
 */
MerchantApi.prototype.addOrderLines = function(request, parameters) {
	var lines = [];
	var line;
	for (var lineNumber in request.orderLines) {
		line = request.orderLines[lineNumber];

		lines.push({
			itemId: line.itemId
			, quantity: line.quantity
			, taxPercent: line.taxPercent
			, unitCode: line.unitCode
			, unitPrice: line.unitPrice
			, description: line.description
			, discount: line.discountPercent
			, goodsType: line.goodsType
		});
	}

	parameters.orderLines = lines;
};

/**
 *
 * @return {string}
 * @private
 */
MerchantApi.prototype.getAuthorizationHeader = function() {
	return {'Authorization': "Basic " + this.base64.encode(this.username +':'+ this.password)};
}

