/**
 * @extends BaseResponse
 * @param responseObject
 * @constructor
 */
function PaymentRequestResponse(responseObject) {
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}

/**
 * @returns {string}
 */
PaymentRequestResponse.prototype.getUrl = function()
{
	if(this.responseObject.Body != null)
	{
		return this.responseObject.Body.Url;
	}
	return null;
};

/**
 * @returns {string}
 */
PaymentRequestResponse.prototype.getDynamicJavascriptUrl = function()
{
	if(this.responseObject.Body != null)
	{
		return this.responseObject.Body.DynamicJavascriptUrl;
	}
	return null;
};
