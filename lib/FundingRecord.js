
function FundingRecord(data)
{
	this.date = '';
	this.type = '';
	this.id = '';
	this.reconciliationIdentifier = '';
	this.payment = '';
	this.order = '';
	this.terminal = '';
	this.shop = '';
	this.transactionCurrency = '';
	this.transactionAmount = '';
	this.settlementCurrency = '';
	this.settlementAmount = '';
	this.fixedFee = '';
	this.fixedFeeVat = '';
	this.rateBasedFee = '';
	this.rateBasedFeeVat = '';

	this.readFromHeaders(data)
}

FundingRecord.prototype.readFromHeaders = function(data)
{
	var map = {
		Date : 'date',
		Type : 'type',
		ID : 'id',
		"Reconciliation Identifier" : 'reconciliationIdentifier',
		"Payment" : 'payment',
		Order : 'order',
		Terminal : 'terminal',
		Shop : 'shop',
		"Transaction Currency" : 'transactionCurrency',
		"Transaction Amount" : 'transactionAmount',
		"Settlement Currency" : 'settlementCurrency',
		"Settlement Amount" : 'settlementAmount',
		"Fixed Fee" : 'fixedFee',
		"Fixed Fee VAT" : 'fixedFeeVat',
		"Rate Based Fee" : 'rateBasedFee',
		"Rate Based Fee VAT" : 'rateBasedFeeVat'
	}

	for(var k in data)
	{
		if(map[k])
		{
			this[map[k]] = data[k];
		}

	}

}