/**
 * @param responseObject {object}
 * @constructor
 */
function PaymentResponse(responseObject)
{
	this.responseObject = responseObject;
}


/**
 * @returns {string}
 */
PaymentResponse.prototype.getPaymentId = function()
{
	return this.responseObject.PaymentId;
};

/**
 * @returns {int}
 */
PaymentResponse.prototype.getTransactionId = function()
{
	return this.responseObject.TransactionId;
};

/**
 * @returns {number}
 */
PaymentResponse.prototype.getReservedAmount = function()
{
	return this.responseObject.ReservedAmount;
};

/**
 * @returns {number}
 */
PaymentResponse.prototype.getCapturedAmount = function()
{
	return this.responseObject.CapturedAmount;
};

/**
 * @returns {number}
 */
PaymentResponse.prototype.getRefundedAmount = function()
{
	return this.responseObject.RefundedAmount;
};

/**
 * @returns {number}
 */
PaymentResponse.prototype.getRecurringDefaultAmount = function()
{
	return this.responseObject.RecurringDefaultAmount;
};

/**
 * @returns {string}
 */
PaymentResponse.prototype.getFraudRecommendation = function()
{
	if(this.responseObject.FraudRecommendation == null)
	{
		return FraudRecommendation.Unknown;
	}
	return this.responseObject.FraudRecommendation;
};

/**
 * @returns {string}
 */
PaymentResponse.prototype.getReconciliationIdentifier = function()
{
	var identifiers = this.responseObject.ReconciliationIdentifiers.ReconciliationIdentifier;

	if(Object.prototype.toString.call( identifiers ) === '[object Array]' )
	{
		return identifiers[identifiers.length - 1].Id;
	}
	else
	{
		return identifiers.Id;
	}
}