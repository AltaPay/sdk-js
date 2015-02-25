
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
BaseResponse.prototype.getFraudRecommendation = function()
{
	if(this.responseObject.Body == null || this.responseObject.Body.Transactions == null || this.responseObject.Body.Transactions.Transaction.FraudRecommendation == null)
	{
		return FraudRecommendation.Unknown;
	}
	return this.responseObject.Body.Transactions.Transaction.FraudRecommendation;
};

