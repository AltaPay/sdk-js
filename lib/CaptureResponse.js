
function CaptureResponse(resultObject) {
	this.resultObject = resultObject;
}

CaptureResponse.prototype.success = function()
{
	return this.resultObject.Header.ErrorCode == 0 && this.resultObject.Body.Result == 'Success';
}