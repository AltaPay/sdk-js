/**
 *
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function Verify3dSecureRequest(baseRequest)
{
	this.paymentId = ''
	this.paRes = '';

	ObjectHelper.extend(this, baseRequest);
}


/**
 *
 * @param key {string}
 * @returns {string}
 * @private
 */
Verify3dSecureRequest.prototype.transformHashKey = function(key) {
	if(key == 'paymentId')
	{
		return 'transactionId';
	}

	return key;
}