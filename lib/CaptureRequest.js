

function CaptureRequest() {
	this.paymentId = '';
	this.amount = null;
	this.orderLines = null;
	this.reconciliationIdentifier = null;
	this.invoiceNumber = null;
	this.salesTax = null;
}

CaptureRequest.prototype.toHash = function() {
	var result = {};
	for(var v in this)
	{
		result[v] = this[v];
	}
	return result;
}