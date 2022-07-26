/**
 * @param responseObject
 * @extends BaseResponse
 * @constructor
 */
function CardWalletSessionResponse(responseObject)
{
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}
