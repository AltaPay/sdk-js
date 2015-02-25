
/**
 *
 * @param paymentRequestBase {PaymentRequestBase}
 * @param customerInfo {CustomerInfo}
 * @constructor
 */
function PaymentRequest(paymentRequestBase, customerInfo) {
    this.salesReconciliationIdentifier = null;
    this.salesInvoiceNumber = null;

    /**
     * Amount - not percent
     * @type {number}
     */
    this.salesTax = null;

    /**
     * @type {CustomerInfo}
     */
    this.customerInfo = customerInfo;

    /**
     * The creation date of the customer in the shop system.
     * Fraud detection services can use this.
     * @type {Date}
     */
    this.customerCreatedDate = null;

    /**
     * @type {OrderLine[]}
     */
    this.orderLines = [];

    /**
     * @see ShippingType
     * @type {string}
     */
    this.shippingType = null;

    this.organisationNumber = null;

    /**
     * @see AccountOffer
     * @type {string}
     */
    this.accountOffer = null;

	ObjectHelper.extend(this, new BaseRequest());
	ObjectHelper.extend(this, paymentRequestBase);
}

/**
 * @param orderLine {OrderLine}
 */
PaymentRequest.prototype.addOrderLine = function(orderLine) {
    this.orderLines.push(orderLine);
};

/**
 * @param key {string}
 * @param value {object}
 * @returns {object}
 */
PaymentRequest.prototype.perElementToHash = function(key, value)
{
	if(key == 'orderLines')
	{
		if(value.length > 0)
		{
			var lines = [];
			for(var o in value)
			{
				lines.push(value[o].toHash());
			}
			return {'orderLines':lines};
		}
		else
		{
			return {};
		}
	}
	return false;
}

/**
 * @param key {string}
 * @returns {string}
 */
PaymentRequest.prototype.transformHashKey = function(key) {
	if(key == 'paymentInfos')
	{
		return 'transaction_info';
	}
	if(key == 'requestConfig')
	{
		return 'config';
	}

	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}