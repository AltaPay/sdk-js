/**
 * @param baseRequest BaseRequest
 * @constructor
 */
function ChargeRequest(baseRequest)
{
	this.subscriptionPaymentId = '';
	this.amount = null;
	this.reconciliationIdentifier = null;

	ObjectHelper.extend(this, baseRequest);
}

/**
 *
 * @param key {string}
 * @returns {string}
 * @private
 */
ChargeRequest.prototype.transformHashKey = function(key) {
	if(key == 'subscriptionPaymentId')
	{
		return 'transaction_id';
	}

	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}