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
PaymentResponse.prototype.getReasonCode = function()
{
	return this.responseObject.ReasonCode;
};

/**
 * @returns {string}
 */
PaymentResponse.prototype.getPaymentId = function()
{
	return this.responseObject.PaymentId;
};

/**
 * @returns {string}
 */
PaymentResponse.prototype.getTransactionStatus = function()
{
	return this.responseObject.TransactionStatus;
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

/**
 * @returns {string}
 */
PaymentResponse.prototype.getCreditCardMaskedPan = function()
{
	return this.responseObject.CreditCardMaskedPan;
};

/**
 * @returns {string}
 */
PaymentResponse.prototype.getPaymentSchemeName = function()
{
	return this.responseObject.PaymentSchemeName;
};

/**
 * @returns {string}
 */
PaymentResponse.prototype.getPaymentSource = function()
{
    return this.responseObject.PaymentSource;
};

/**
 * @returns {string}
 */
PaymentResponse.prototype.getCreditCardExpiryMonth = function()
{
	return this.responseObject.CreditCardExpiry.Month;
};

/**
 * @returns {string}
 */
PaymentResponse.prototype.getCreditCardExpiryYear = function()
{
	return this.responseObject.CreditCardExpiry.Year;
};