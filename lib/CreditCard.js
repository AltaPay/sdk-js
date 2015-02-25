/**
 *
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function CreditCard(baseRequest)
{
	this.cardnum = '';
	this.emonth = '';
	this.eyear = '';
	this.cvc = null;
	this.cardholderName = null;
	this.cardholderAddress = null;
	this.issueNumber = null;
	this.startMonth = null;
	this.startYear = null;

	ObjectHelper.extend(this, baseRequest);
}

