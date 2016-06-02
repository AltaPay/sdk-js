/**
 * @extends BaseResponse
 * @param responseObject
 * @constructor
 */
function InvoiceReservationResponse(responseObject) {
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}
