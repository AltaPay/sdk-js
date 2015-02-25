
function BaseTransactionResponse()
{

}

BaseTransactionResponse.prototype.getReconciliationIdentifier = function()
{
	return this.getPayment(0).getReconciliationIdentifier();
}