
function PaymentRequestResponse(responseObject) {
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}

PaymentRequestResponse.prototype.getUrl = function()
{
	if(this.responseObject.Body != null)
	{
		return this.responseObject.Body.Url;
	}
	return null;
};

PaymentRequestResponse.prototype.getDynamicJavascriptUrl = function()
{
	if(this.responseObject.Body != null)
	{
		return this.responseObject.Body.DynamicJavascriptUrl;
	}
	return null;
};
