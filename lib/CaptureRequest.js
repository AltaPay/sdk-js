/**
 * @extends BaseRequest
 * @constructor
 */
function CaptureRequest() {
	this.paymentId = '';
	this.amount = null;
	this.orderLines = [];
	this.reconciliationIdentifier = null;
	this.invoiceNumber = null;
	this.salesTax = null;

	ObjectHelper.extend(this, new BaseRequest());
}

/**
 * @param orderLine {OrderLine}
 */
CaptureRequest.prototype.addOrderLine = function(orderLine) {
	this.orderLines.push(orderLine);
};

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