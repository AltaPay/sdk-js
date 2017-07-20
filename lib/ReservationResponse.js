/**
 * @extends BaseResponse
 * @param responseObject
 * @constructor
 */
function ReservationResponse(responseObject) {
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}
