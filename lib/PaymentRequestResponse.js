
function PaymentRequestResponse(resultObject) {
	this.resultObject = resultObject;
}

PaymentRequestResponse.prototype.getResultObject = function()
{
	return this.resultObject;
};

PaymentRequestResponse.prototype.success = function()
{
	return this.resultObject.Header.ErrorCode == 0 && this.resultObject.Body.Result == 'Success';
};

PaymentRequestResponse.prototype.getErrorMessage = function()
{
	return this.resultObject.Header.ErrorMessage;
};

PaymentRequestResponse.prototype.getUrl = function()
{
	if(this.resultObject.Body != null)
	{
		return this.resultObject.Body.Url;
	}
	return null;
};

PaymentRequestResponse.prototype.getDynamicJavascriptUrl = function()
{
	if(this.resultObject.Body != null)
	{
		return this.resultObject.Body.DynamicJavascriptUrl;
	}
	return null;
};
