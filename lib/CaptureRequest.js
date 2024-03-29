/**
 *
 * @extends BaseRequest
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function CaptureRequest(baseRequest) {
	this.paymentId = '';
	this.amount = null;
	this.orderLines = [];
	this.reconciliationIdentifier = null;
	this.invoiceNumber = null;
	this.salesTax = null;

	ObjectHelper.extend(this, baseRequest);
}

/**
 * @param orderLine {OrderLine}
 */
CaptureRequest.prototype.addOrderLine = function(orderLine) {
	this.orderLines.push(orderLine);
};

/**
 *
 * @param key {string}
 * @param value {object}
 * @returns {boolean|object}
 */
CaptureRequest.prototype.perElementToHash = function(key, value)
{
	if(key == 'orderLines')
	{
		if(value.length > 0)
		{
			var lines = [];
			for(var o in value)
			{
				lines.push(value[o].toHash());
			}
			return {'orderLines':lines};
		}
		else
		{
			return {};
		}
	}
	return false;
}

/**
 * @private
 * @param key {string}
 * @returns {string}
 */
CaptureRequest.prototype.transformHashKey = function(key) {
	if(key == 'paymentId')
	{
		return 'transaction_id';
	}
	if(key == 'orderLines')
	{
		return 'orderLines';
	}

	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}