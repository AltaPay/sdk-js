/**
 * @extends PaymentRequest
 * @extends BaseRequest
 * @constructor
 * @param providerData
 * @param terminal
 * @param shopOrderid
 * @param amount
 * @param currency
 */
function CardWalletAuthorizeRequest(providerData, terminal, shopOrderid, amount, currency) {

	// Required:
	this.providerData = providerData;
	this.terminal = terminal;
	this.shopOrderid = shopOrderid;
	this.amount = amount;
	this.currency = currency;

	// Optional:
	this.paymentInfos = []; // transaction info
	this.fraudService = null;
	this.shippingMethod = null;
	this.saleReconciliationIdentifier = null;
	this.salesInvoiceNumber = null;
	this.salesTax = null;
	this.customerCreatedDate = null;
	this.cookie = null;
	this.language = null;

	/**
	 * @type {CustomerInfo}
	 */
	this.customerInfo = null;

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
CardWalletAuthorizeRequest.prototype.transformHashKey = function(key) {

	if (key == 'paymentInfos') {
		return 'transaction_info';
	}

	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}