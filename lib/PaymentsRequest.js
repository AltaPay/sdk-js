/**
 *
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function PaymentsRequest(baseRequest)
{
	this.shop = null;
	this.terminal = null;
	this.transactionId = null;
	this.paymentId = null;
	this.shopOrderid = null;
	this.paymentStatus = null;
	this.reconciliationIdentifier = null;

	ObjectHelper.extend(this, baseRequest);
}

/**
 *
 * @param key {string}
 * @returns {string}
 * @private
 */
PaymentsRequest.prototype.transformHashKey = function(key) {
	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}