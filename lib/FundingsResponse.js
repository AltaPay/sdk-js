/**
 *
 * @param responseObject {object}
 * @param merchantApi {MerchantApi}
 * @constructor
 */
function FundingsResponse(responseObject, merchantApi)
{
	this.responseObject = responseObject;
	this.merchantApi = merchantApi;
}

/**
 * @returns {boolean}
 */
FundingsResponse.prototype.success = function()
{
	return this.responseObject.Header.ErrorCode == 0;
}

/**
 * @returns {object}
 */
FundingsResponse.prototype.getResponseObject = function()
{
	return this.responseObject;
}

FundingsResponse.prototype.getNumberOfPages = function()
{
	return this.responseObject.Body.Fundings['@numberOfPages'];
}

FundingsResponse.prototype.length = function()
{
	if(this.responseObject.Body == null || this.responseObject.Body.Fundings == null)
	{
		return 0;
	}
	if(Object.prototype.toString.call( this.responseObject.Body.Fundings.Funding ) === '[object Array]' )
	{
		return this.responseObject.Body.Fundings.Funding.length;
	}
	else
	{
		return 1;
	}

}

FundingsResponse.prototype.getFundings = function()
{
	if(this.responseObject.Body == null || this.responseObject.Body.Fundings == null)
	{
		return [];
	}
	if(Object.prototype.toString.call( this.responseObject.Body.Fundings.Funding ) === '[object Array]' )
	{
		var result = [];
		for(var k in this.responseObject.Body.Fundings.Funding)
		{
			result.push(new FundingResponse(this.responseObject.Body.Fundings.Funding[k], this.merchantApi));
		}
		return result;
	}
	else
	{
		return [new FundingResponse(this.responseObject.Body.Fundings.Funding, this.merchantApi)];
	}
}