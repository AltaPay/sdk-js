
function BaseResponse()
{

}

/**
 * @returns {object}
 */
BaseResponse.prototype.getResponseObject = function()
{
	return this.responseObject;
}

/**
 * @returns {boolean}
 */
BaseResponse.prototype.success = function()
{
	return this.responseObject.Header.ErrorCode == 0 && this.responseObject.Body.Result == 'Success';
}

/**
 * @returns {string}
 */
BaseResponse.prototype.getErrorMessage = function()
{
	return this.responseObject.Header.ErrorMessage;
};

/**
 * @returns {string}
 */
BaseResponse.prototype.getPaymentId = function()
{
	if(this.responseObject.Body == null || this.responseObject.Body.Transactions == null)
	{
		return null;
	}
	return this.responseObject.Body.Transactions.Transaction.PaymentId;
};

/**
 * @returns {int}
 */
BaseResponse.prototype.getTransactionId = function()
{
	if(this.responseObject.Body == null || this.responseObject.Body.Transactions == null)
	{
		return null;
	}
	return this.responseObject.Body.Transactions.Transaction.TransactionId;
};

/**
 * @returns {number}
 */
BaseResponse.prototype.getReservedAmount = function()
{
	if(this.responseObject.Body == null || this.responseObject.Body.Transactions == null)
	{
		return null;
	}
	return this.responseObject.Body.Transactions.Transaction.ReservedAmount;
};

/**
 * @returns {number}
 */
BaseResponse.prototype.getCapturedAmount = function()
{
	if(this.responseObject.Body == null || this.responseObject.Body.Transactions == null)
	{
		return null;
	}
	return this.responseObject.Body.Transactions.Transaction.CapturedAmount;
};

/**
 * @returns {number}
 */
BaseResponse.prototype.getRefundedAmount = function()
{
	if(this.responseObject.Body == null || this.responseObject.Body.Transactions == null)
	{
		return null;
	}
	return this.responseObject.Body.Transactions.Transaction.RefundedAmount;
};

/**
 * @returns {number}
 */
BaseResponse.prototype.getRecurringDefaultAmount = function()
{
	if(this.responseObject.Body == null || this.responseObject.Body.Transactions == null)
	{
		return null;
	}
	return this.responseObject.Body.Transactions.Transaction.RecurringDefaultAmount;
};

/**
 * @returns {string}
 */
BaseResponse.prototype.getFraudRecommendation = function()
{
	if(this.responseObject.Body == null || this.responseObject.Body.Transactions == null || this.responseObject.Body.Transactions.Transaction.FraudRecommendation == null)
	{
		return FraudRecommendation.Unknown;
	}
	return this.responseObject.Body.Transactions.Transaction.FraudRecommendation;
};

