/**
 * @extends PaymentRequest
 * @extends BaseRequest
 * @param customerInfo {CustomerInfo}
 * @constructor
 */
function ReservationRequest(customerInfo) {

	// Required:
	this.terminal = null;
	this.shopOrderid = null;
	this.amount = 0;
	this.currency = null;

	// Option1: Credit card Token
	this.creditCardToken = null;

	// Option2: Pan, Month, Year
	this.pan = null;
	this.expiryMonth = 0;
	this.expiryYear = 0;

	// Optional:
	this.cvc = null;
	this.paymentInfos = []; // transaction info
	this.type = null; // payment type
	this.paymentSource = null;
	this.fraudService = null;
	this.surcharge = null;
	this.customerCreatedDate = null;
	this.shippingMethod = null;

	/**
	 * @type {CustomerInfo}
	 */
	this.customerInfo = customerInfo;

	/**
	 * @type {OrderLine[]}
	 */
	this.orderLines = [];

	// the order below matters:
	ObjectHelper.extend(this, new PaymentRequest(new PaymentRequestBase(new PaymentRequestConfig(), new PaymentInfo()), this.customerInfo));
	ObjectHelper.extend(this, new BaseRequest());

}

/**
 * @param key {string}
 * @returns {string}
 */
ReservationRequest.prototype.transformHashKey = function(key) {

	if (key == 'paymentInfos') {
		return 'transaction_info';
	}
	else if (key == 'pan') {
		return 'cardnum';
	}
	else if (key == 'expiryMonth') {
		return 'emonth';
	}
	else if (key == 'expiryYear') {
		return 'eyear';
	}
	else if(key == 'agreementConfig')
	{
		return 'agreement';
	}
	else {
		return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
	}
};