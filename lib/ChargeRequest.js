/**
 * @param baseRequest BaseRequest
 * @constructor
 */
function ChargeRequest(baseRequest)
{
	this.subscriptionPaymentId = '';
	this.amount = null;
	this.reconciliationIdentifier = null;
	this.agreementUnscheduledType = null;

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
		return 'agreement[id]';
	}
	if(key == 'agreementUnscheduledType')
	{
		return 'agreement[unscheduled_type]';
	}

	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}