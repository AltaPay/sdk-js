/**
 * @param baseRequest {BaseRequest}
 * @param paymentRequestBase {PaymentRequestBase}
 * @param customerInfo {CustomerInfo}
 * @param creditCard {CreditCard}
 * @extends BaseRequest
 * @extends PaymentRequestBase
 * @constructor
 */
function InitiatePaymentRequest(baseRequest,paymentRequestBase, customerInfo, creditCard)
{
	this.customerInfo = customerInfo;
	this.creditCard = creditCard;
	this.paymentSource = 'eCommerce';

	/**
	 * @type {OrderLine[]}
	 */
	this.orderLines = [];

	ObjectHelper.extend(this, baseRequest);
	ObjectHelper.extend(this, paymentRequestBase);
}

/**
 * @param key {string}
 * @param value {object}
 * @returns {object}
 */
InitiatePaymentRequest.prototype.perElementToHash = function(key, value)
{
	if(key == 'creditCard' && value)
	{
		return value.toHash();
	}
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
 * @param orderLine {OrderLine}
 */
InitiatePaymentRequest.prototype.addOrderLine = function(orderLine) {
	this.orderLines.push(orderLine);
};

/**
 *
 * @param key {string}
 * @returns {string}
 */
InitiatePaymentRequest.prototype.transformHashKey = function(key) {
	if(key == 'paymentInfos')
	{
		return 'transaction_info';
	}
	if(key == 'requestConfig')
	{
		return 'config';
	}
	if(key == 'orderLines')
	{
		return key;
	}

	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}