
function BaseResponse()
{

}

BaseResponse.prototype.getResponseObject = function()
{
	return this.responseObject;
}

BaseResponse.prototype.success = function()
{
	return this.responseObject.Header.ErrorCode == 0 && this.responseObject.Body.Result == 'Success';
}
