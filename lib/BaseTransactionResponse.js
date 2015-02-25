
function BaseTransactionResponse()
{

}

/**
 * @returns {string}
 */
BaseTransactionResponse.prototype.getReconciliationIdentifier = function()
{
	var identifiers = this.responseObject.Body.Transactions.Transaction.ReconciliationIdentifiers.ReconciliationIdentifier;

	if(Object.prototype.toString.call( identifiers ) === '[object Array]' )
	{
		return identifiers[identifiers.length - 1].Id;
	}
	else
	{
		return identifiers.Id;
	}
}