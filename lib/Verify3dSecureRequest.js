/**
 *
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function Verify3dSecureRequest(baseRequest, transactionId, paRes)
{
	this.transactionId = transactionId;
	this.md = transactionId;
	this.paRes = paRes;

	ObjectHelper.extend(this, baseRequest);
}


/**
 *
 * @param key {string}
 * @returns {string}
 * @private
 */
Verify3dSecureRequest.prototype.transformHashKey = function(key) {
	if(key == 'md')
	{
		return '3DSecureRegular[MD]';
	}
	else if(key == 'paRes')
	{
		return '3DSecureRegular[paRes]';
	}

	return key;
}