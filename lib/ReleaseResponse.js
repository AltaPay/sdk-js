/**
 * @extends BaseResponse
 * @param responseObject
 * @constructor
 */
function ReleaseResponse(responseObject)
{
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}