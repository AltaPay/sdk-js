/**
 * @param responseObject
 * @extends BaseResponse
 * @constructor
 */
function UpdateOrderResponse(responseObject)
{
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}
