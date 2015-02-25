/**
 *
 * @extends BaseRequest
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function ReleaseRequest(baseRequest)
{
	this.paymentId = '';

	ObjectHelper.extend(this, baseRequest);
}

/**
 * @param key {string}
 * @returns {string}
 * @private
 */
ReleaseRequest.prototype.transformHashKey = function(key) {
	if(key == 'paymentId')
	{
		return 'transaction_id';
	}

	return key;
}