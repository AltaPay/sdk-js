
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
 * @param number
 * @return {PaymentResponse}
 */
BaseResponse.prototype.getPayment = function(number)
{
	if(this.responseObject.Body == null || this.responseObject.Body.Transactions == null)
	{
		return new PaymentResponse({});
	}
	if(Object.prototype.toString.call( this.responseObject.Body.Transactions.Transaction ) === '[object Array]' )
	{
		return new PaymentResponse(this.responseObject.Body.Transactions.Transaction[number]);
	}
	else if(number == 0)
	{
		return new PaymentResponse(this.responseObject.Body.Transactions.Transaction);
	}
	else
	{
		return new PaymentResponse({});
	}

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
	if(this.responseObject.Header.ErrorCode != 0)
	{
		return this.responseObject.Header.ErrorMessage;
	}
	else if(this.responseObject.Body.Result != 'Success')
	{
		return this.responseObject.Body.MerchantErrorMessage;
	}
	else
	{
		return null;
	}

};


/**
 * @returns {string}
 */
BaseResponse.prototype.getPaymentId = function()
{
	return this.getPayment(0).getPaymentId();
};

/**
 * @returns {int}
 */
BaseResponse.prototype.getTransactionId = function()
{
	return this.getPayment(0).getTransactionId();
};

/**
 * @returns {number}
 */
BaseResponse.prototype.getReservedAmount = function()
{
	return this.getPayment(0).getReservedAmount();
};

/**
 * @returns {number}
 */
BaseResponse.prototype.getCapturedAmount = function()
{
	return this.getPayment(0).getCapturedAmount();
};

/**
 * @returns {number}
 */
BaseResponse.prototype.getRefundedAmount = function()
{
	return this.getPayment(0).getRefundedAmount();
};

/**
 * @returns {number}
 */
BaseResponse.prototype.getRecurringDefaultAmount = function()
{
	return this.getPayment(0).getRecurringDefaultAmount();
};

/**
 * @returns {string}
 */
BaseResponse.prototype.getFraudRecommendation = function()
{
	return this.getPayment(0).getFraudRecommendation();
};

