
function AltaPayFactory() {
}

/**
 * URL is to connect to your gateway instance. If you are in doubt contact support.
 * For test, use: testgateway.altapaysecure.com
 *
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
		, this.getBaseApi()
	);
};

/**
 * URL is to connect to your gateway instance. If you are in doubt contact support.
 * For test, use: testgateway.altapaysecure.com
 *
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
		, this.getXml()
		, this.getResponseFactory()
		, this.getBase64()
		, this.getBaseApi()
	);
};

/**
 * @returns {Logger}
 */
AltaPayFactory.prototype.getLogger = function() {
	return new Logger();
};

/**
 * @returns {BaseApi}
 */
AltaPayFactory.prototype.getBaseApi = function() {
	return new BaseApi();
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
	return new PaymentRequestBase(this.getPaymentRequestConfig(), this.getPaymentInfo());
};

/**
 * @returns {PaymentRequest}
 */
AltaPayFactory.prototype.getPaymentRequest = function() {
	return new PaymentRequest(this.getPaymentRequestBase(), this.getCustomerInfo());
};

/**
 * @returns {InitiatePaymentRequest}
 */
AltaPayFactory.prototype.getInitiatePaymentRequest = function() {
	return new InitiatePaymentRequest(this.getBaseRequest(),this.getPaymentRequestBase(), this.getCustomerInfo(), this.getCreditCard());
};

/**
 * @returns {InvoiceReservationRequest}
 */
AltaPayFactory.prototype.getInvoiceReservationRequest = function() {
	return new InvoiceReservationRequest(this.getCustomerInfo());
};

/**
 * @returns {ReservationRequest}
 */
AltaPayFactory.prototype.getReservationRequest = function() {
	return new ReservationRequest(this.getCustomerInfo());
};

/**
 * @returns {CaptureRequest}
 */
AltaPayFactory.prototype.getCaptureRequest = function() {
	return new CaptureRequest(this.getBaseRequest());
};

/**
 * @returns {RefundRequest}
 */
AltaPayFactory.prototype.getRefundRequest = function() {
	return new RefundRequest(this.getBaseRequest());
};


/**
 * @returns {ReleaseRequest}
 */
AltaPayFactory.prototype.getReleaseRequest = function() {
	return new ReleaseRequest(this.getBaseRequest());
};

/**
 * @returns {ChargeRequest}
 */
AltaPayFactory.prototype.getChargeRequest = function() {
	return new ChargeRequest(this.getBaseRequest());
};


/**
 * @returns {CreditCard}
 */
AltaPayFactory.prototype.getCreditCard = function() {
	return new CreditCard(this.getBaseRequest());
};

/**
 * @returns {BaseRequest}
 */
AltaPayFactory.prototype.getBaseRequest = function() {
	return new BaseRequest();
};

/**
 * @returns {PaymentInfo}
 */
AltaPayFactory.prototype.getPaymentInfo = function() {
	return new PaymentInfo(this.getBaseRequest());
};

/**
 * @returns {OrderLine}
 */
AltaPayFactory.prototype.getOrderLine = function() {
	return new OrderLine(this.getBaseRequest());
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
 * @returns {Verify3dSecureRequest}
 */
AltaPayFactory.prototype.getVerify3dSecureRequest = function(transactionId, paRes) {
	return new Verify3dSecureRequest(this.getBaseRequest(), transactionId, paRes);
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

/**
 * @returns {HttpHelper}
 */
AltaPayFactory.prototype.getHttpHelper = function() {
	return new HttpHelper();
}

/**
 * @returns {PaymentsRequest}
 */
AltaPayFactory.prototype.getPaymentsRequest = function() {
	return new PaymentsRequest(this.getBaseRequest());
}

/**
 * @returns {FundingsRequest}
 */
AltaPayFactory.prototype.getFundingsRequest = function() {
	return new FundingsRequest(this.getBaseRequest());
}

/**
 * @returns {UpdateOrderRequest}
 */
AltaPayFactory.prototype.getUpdateOrderRequest = function(paymentId, orderLines) {
	return new UpdateOrderRequest(paymentId, orderLines, this.getBaseRequest());
};

/**
 * @returns {AgreementConfig}
 */
AltaPayFactory.prototype.getAgreementConfig = function() {
	return new AgreementConfig();
};
/**
 * @returns {AgreementConfig}
 */
AltaPayFactory.prototype.getAgreementConfig = function() {
	return new AgreementConfig();
};
