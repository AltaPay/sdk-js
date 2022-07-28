/**
 * @param responseObject
 * @extends BaseResponse
 * @constructor
 */
function CardWalletAuthorizeResponse(responseObject)
{
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}
