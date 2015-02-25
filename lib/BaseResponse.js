
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

