/**
 * @extends BaseResponse
 * @param responseObject
 * @constructor
 */
function InitiatePaymentResponse(responseObject)
{
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}

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