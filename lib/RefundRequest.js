
function RefundRequest()
{
	this.paymentId = '';
	this.amount = null;
	this.orderLines = [];
	this.reconciliationIdentifier = null;
	this.invoiceNumber = null;
	this.allowOverRefund = null;
}

/**
 * @param orderLine {OrderLine}
 */
RefundRequest.prototype.addOrderLine = function(orderLine) {
	this.orderLines.push(orderLine);
};

RefundRequest.prototype.toHash = function() {
	var result = {};
	for(var v in this)
	{
		if(RefundRequest.prototype[v])
		{
			continue;
		}
		if((v == 'orderLines') && (this[v].length > 0))
		{
			result.orderLines = [];
			for(var o in this.orderLines)
			{
				result.orderLines.push(this.orderLines[o].toHash());
			}
		}
		if(this[v] !== null)
		{
			result[this.transformHashKey(v)] = this[v].toString();
		}
	}
	return result;
}

RefundRequest.prototype.transformHashKey = function(key) {
	if(key == 'paymentId')
	{
		return 'transaction_id';
	}

	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}