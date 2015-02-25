/**
 * @extends BaseRequest
 * @constructor
 */
function ReleaseRequest()
{
	this.paymentId = '';

	ObjectHelper.extend(this, new BaseRequest());
}

ReleaseRequest.prototype.transformHashKey = function(key) {
	if(key == 'paymentId')
	{
		return 'transaction_id';
	}

	return key;
}