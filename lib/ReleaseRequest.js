
function ReleaseRequest()
{
	this.paymentId = '';

	ObjectHelper.extend(this, new BaseRequest());
}

RefundRequest.prototype.transformHashKey = function(key) {
	if(key == 'paymentId')
	{
		return 'transaction_id';
	}

	return key;
}