
function ResponseFactory()
{

}

ResponseFactory.prototype.getCaptureResponse = function(resultObject)
{
	return new CaptureResponse(resultObject);
}