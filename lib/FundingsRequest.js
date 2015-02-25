/**
 *
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function FundingsRequest(baseRequest)
{
	this.page = 0;

	ObjectHelper.extend(this, baseRequest);
}
