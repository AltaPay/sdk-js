/**
 * @extends BaseResponse
 * @param responseObject
 * @constructor
 */
function InitiatePaymentResponse(responseObject)
{
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}
