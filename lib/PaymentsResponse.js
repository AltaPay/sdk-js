/**
 * @param responseObject {object}
 * @constructor
 */
function PaymentsResponse(responseObject)
{
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}

PaymentsResponse.prototype.length = function()
{
	if(this.responseObject.Body == null || this.responseObject.Body.Transactions == null)
	{
		return 0;
	}
	if(Object.prototype.toString.call( this.responseObject.Body.Transactions.Transaction ) === '[object Array]' )
	{
		return this.responseObject.Body.Transactions.Transaction.length;
	}
	else
	{
		return 1;
	}

}

PaymentsResponse.prototype.getPayments = function()
{
	if(this.responseObject.Body == null || this.responseObject.Body.Transactions == null)
	{
		return [];
	}
	if(Object.prototype.toString.call( this.responseObject.Body.Transactions.Transaction ) === '[object Array]' )
	{
		var result = [];
		for(var k in this.responseObject.Body.Transactions.Transaction)
		{
			result.push(new PaymentResponse(this.responseObject.Body.Transactions.Transaction[k]));
		}
		return result;
	}
	else
	{
		return [new PaymentResponse(this.responseObject.Body.Transactions.Transaction)];
	}
}