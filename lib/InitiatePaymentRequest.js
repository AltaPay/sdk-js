/**
 * @param baseRequest {PaymentRequestBase}
 * @param customerInfo {CustomerInfo}
 * @param creditCard {CreditCard}
 * @extends BaseRequest
 * @extends PaymentRequestBase
 * @constructor
 */
function InitiatePaymentRequest(baseRequest, customerInfo, creditCard)
{
	this.customerInfo = customerInfo;
	this.creditCard = creditCard;
	this.paymentSource = 'eCommerce';

	ObjectHelper.extend(this, new BaseRequest());
	ObjectHelper.extend(this, baseRequest);
}


InitiatePaymentRequest.prototype.perElementToHash = function(key, value)
{
	if(key == 'creditCard')
	{
		return value.toHash();
	}
	return false;
}


InitiatePaymentRequest.prototype.transformHashKey = function(key) {
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