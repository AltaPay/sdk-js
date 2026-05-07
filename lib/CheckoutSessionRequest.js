/**
 * @extends PaymentRequest
 * @extends BaseRequest
 * @param paymentRequestBase {PaymentRequestBase}
 * @param customerInfo {CustomerInfo}
 * @constructor
 */
function CheckoutSessionRequest(paymentRequestBase, customerInfo) {
	this.terminals = [];
	this.sessionId = null;

	ObjectHelper.extend(this, new PaymentRequest(paymentRequestBase, customerInfo));
	ObjectHelper.extend(this, new BaseRequest());
}

/**
 * @param terminal {string}
 */
CheckoutSessionRequest.prototype.addTerminal = function(terminal) {
	this.terminals.push(terminal);
};

/**
 * @param key {string}
 * @param value {object}
 * @returns {object}
 */
CheckoutSessionRequest.prototype.perElementToHash = function(key, value)
{
	if(key == 'terminals')
	{
		if(value.length > 0)
		{
			return {'terminals': value};
		}
		else
		{
			return {};
		}
	}
	if(key == 'orderLines')	{
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
CheckoutSessionRequest.prototype.transformHashKey = function(key) {
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
	if(key == 'authType')
	{
		return 'type';
	}
	if(key == 'agreementConfig')
	{
		return 'agreement';
	}
	if(key == 'terminals')
	{
	        return 'terminals';
	}
	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}
