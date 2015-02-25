/**
 * @param responseObject
 * @extends BaseResponse
 * @extends BaseTransactionResponse
 * @constructor
 */
function RefundResponse(responseObject)
{
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
	ObjectHelper.extend(this, new BaseTransactionResponse());
}
