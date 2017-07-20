/**
 * @extends PaymentRequest
 * @extends BaseRequest
 * @param customerInfo {CustomerInfo}
 * @constructor
 */
function ReservationRequest(customerInfo) {

	this.paymentSource = null;
    this.terminal = null;
    this.shopOrderid = null;
    this.amount = 0;
	this.currency = null;
	this.type = null; // payment type
	this.customerCreatedDate = null;
	this.fraudService = null;
	this.cvc = null;

	// Option1: Credit card Token
	this.creditCardToken = null;

	// Option2: Pan, Month, Year
	this.pan = null;
	this.expiryMonth = 0;
	this.expiryYear = 0;

	/**
	 * @type {CustomerInfo}
	 */
	this.customerInfo = customerInfo;

	/**
	 * @type {OrderLine[]}
	 */
	this.orderLines = [];

	// the order below matters:
	ObjectHelper.extend(this, new PaymentRequest());
	ObjectHelper.extend(this, new BaseRequest());

}

/**
 * @param key {string}
 * @returns {string}
 */
ReservationRequest.prototype.transformHashKey = function(key) {

	if (key == 'pan') {
		return 'cardnum';
	}
	else if (key == 'expiryMonth') {
		return 'emonth';
	}
	else if (key == 'expiryYear') {
		return 'eyear';
	}
	else {
		return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
	}
};