/**
 * @constructor
 */
function ChargeResponse(responseObject)
{
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}

/**
 * @return {PaymentResponse}
 */
ChargeResponse.prototype.getSubscriptionPayment = function()
{
	return this.getPayment(0);
}

/**
 * @return {PaymentResponse}
 */
ChargeResponse.prototype.getChargePayment = function()
{
	return this.getPayment(1);
}