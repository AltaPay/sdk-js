
function AltaPayFactory() {
}

/**
 * @returns {MerchantApi}
 */
AltaPayFactory.prototype.getMerchantApi = function(username, password, url) {
	return new MerchantApi(
		username
		, password
		, url
		, this
		, this.getLogger()
		, this.getHttp()
		, this.getDateHelper()
		, this.getXml()
		, this.getResponseFactory()
		, this.getBase64()
	);
};

/**
 * @returns {ProcessorApi}
 */
AltaPayFactory.prototype.getProcessorApi = function(username, password, url) {
	return new ProcessorApi(
		username
		, password
		, url
		, this
		, this.getLogger()
		, this.getHttp()
	);
};

/**
 * @returns {Logger}
 */
AltaPayFactory.prototype.getLogger = function() {
	return new Logger();
};

/**
 * @returns {Http}
 */
AltaPayFactory.prototype.getHttp = function() {
	return new Http();
};

/**
 * @returns {Xml}
 */
AltaPayFactory.prototype.getXml = function() {
	return new Xml();
};

/**
 * @returns {PaymentRequestBase}
 */
AltaPayFactory.prototype.getPaymentRequestBase = function() {
	return new PaymentRequestBase(this.getPaymentRequestConfig());
};

/**
 * @returns {PaymentRequest}
 */
AltaPayFactory.prototype.getPaymentRequest = function() {
	return new PaymentRequest(this.getPaymentRequestBase(), this.getCustomerInfo());
};

/**
 * @returns {CustomerInfo}
 */
AltaPayFactory.prototype.getCustomerInfo = function() {
	return new CustomerInfo(this.getCustomerAddress(), this.getCustomerAddress());
};

/**
 * @returns {CustomerAddress}
 */
AltaPayFactory.prototype.getCustomerAddress = function() {
	return new CustomerAddress();
};

/**
 * @returns {PaymentRequestConfig}
 */
AltaPayFactory.prototype.getPaymentRequestConfig = function() {
	return new PaymentRequestConfig();
};

/**
 * @returns {DateHelper}
 */
AltaPayFactory.prototype.getDateHelper = function() {
	return new DateHelper();
};

/**
 * @returns {ResponseFactory}
 */
AltaPayFactory.prototype.getResponseFactory = function () {
	return new ResponseFactory();
};

/**
 * @returns {ResponseFactory}
 */
AltaPayFactory.prototype.getBase64 = function () {
	return new Base64();
};
