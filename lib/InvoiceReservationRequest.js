/**
 * @extends PaymentRequest
 * @extends BaseRequest
 * @param customerInfo {CustomerInfo}
 * @constructor
 */
function InvoiceReservationRequest(customerInfo) {

	//
    // required:
    //
    this.terminal = '';
    this.shopOrderid = '';
    this.amount = 0;
    this.currency = ''; // currency code (3 chars)
	/**
	 * @type {CustomerInfo}
	 */
	this.customerInfo = customerInfo;

    //
    // optional:
    //
    this.type = null; // payment type
	this.transaction_info = null;
	this.accountNumber = null;
	this.bankCode = null;
	this.fraud_service = null;
	this.payment_source = null;
	/**
	 * @type {OrderLine[]}
	 */
	this.orderLines = [];
	this.organisationNumber = null;
	this.personalIdentifyNumber = null;
	this.birthDate = null;

	// the order below matters:
	ObjectHelper.extend(this, new PaymentRequest());
	ObjectHelper.extend(this, new BaseRequest());

}

/**
 * @param key {string}
 * @returns {string}
 */
InvoiceReservationRequest.prototype.transformHashKey = function(key) {

	if (key == 'customerInfo') {
		return 'customer_info';
	}
	else if (key == 'shopOrderid') {
		return 'shop_orderid';
	}
	else {
		return key;
	}
};