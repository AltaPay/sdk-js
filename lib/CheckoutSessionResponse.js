/**
 * @extends BaseResponse
 * @param responseObject
 * @constructor
 */
function CheckoutSessionResponse(responseObject) {
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}

/**
 * @returns {string}
 */
CheckoutSessionResponse.prototype.getSessionId = function()
{
	if(this.responseObject.Body != null && this.responseObject.Body.Session != null)
	{
		return this.responseObject.Body.Session.Id;
	}
	return null;
};

/**
 * @returns {string}
 */
CheckoutSessionResponse.prototype.getSessionStatus = function()
{
	if(this.responseObject.Body != null && this.responseObject.Body.Session != null)
	{
		return this.responseObject.Body.Session.Status;
	}
	return null;
};

/**
 * @returns {boolean}
 */
CheckoutSessionResponse.prototype.success = function()
{
	return this.responseObject.Header.ErrorCode == 0;
};

/**
 * @returns {string}
 */
CheckoutSessionResponse.prototype.getErrorMessage = function()
{
	if(this.responseObject.Header.ErrorCode != 0)
	{
		return this.responseObject.Header.ErrorMessage;
	}
	return null;
};
