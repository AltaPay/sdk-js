/**
 * @extends BaseResponse
 * @extends BaseTransactionResponse
 * @param responseObject
 * @constructor
 */
function InitiatePaymentResponse(responseObject)
{
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
	ObjectHelper.extend(this, new BaseTransactionResponse());
}

/**
 * @param key {string}
 * @returns {string}
 */
InitiatePaymentResponse.prototype.getPaymentInfo = function(key)
{
	var transaction = this.responseObject.Body.Transactions.Transaction;

	if(transaction.PaymentInfos)
	{
		if(Object.prototype.toString.call( transaction.PaymentInfos.PaymentInfo ) === '[object Array]' )
		{
			for(var k in transaction.PaymentInfos.PaymentInfo)
			{
				if(transaction.PaymentInfos.PaymentInfo[k]['@name'] == key)
				{
					return transaction.PaymentInfos.PaymentInfo[k]['@'];
				}
			}
		}
		else if(transaction.PaymentInfos.PaymentInfo['@name'] == key)
		{
			return transaction.PaymentInfos.PaymentInfo['@'];
		}
	}
	return null;
}

/**
 * @returns {boolean}
 */
InitiatePaymentResponse.prototype.threeDSecure = function()
{
	return this.responseObject.Header.ErrorCode == 0 && this.responseObject.Body.Result == '3dSecure';
}

/**
 * @returns {string}
 */
InitiatePaymentResponse.prototype.getPaReq = function()
{
	var items = this.responseObject.Body.RedirectResponse.Data.Item;

	for (var k in items) {
		if (items[k]['@key'] == 'PaReq') {
			return items[k]['@'];
		}
	}

	return null;

}

/**
 * @returns {string}
 */
InitiatePaymentResponse.prototype.getRedirectUrl = function()
{
	return this.responseObject.Body.RedirectResponse.Url;
}
