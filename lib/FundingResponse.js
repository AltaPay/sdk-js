/**
 *
 * @param responseObject {object}
 * @param merchantApi {MerchantApi}
 * @constructor
 */
function FundingResponse(responseObject, merchantApi)
{
	this.responseObject = responseObject;
	this.merchantApi = merchantApi;
}

/**
 * @return {string}
 */
FundingResponse.prototype.getFilename = function()
{
	return this.responseObject.Filename;
}

/**
 * @return {string}
 */
FundingResponse.prototype.getContractIdentifier = function()
{
	return this.responseObject.ContractIdentifier;
}

/**
 * @return {string}
 */
FundingResponse.prototype.getAcquirer = function()
{
	return this.responseObject.Acquirer;
}

/**
 * @return {string}
 */
FundingResponse.prototype.getFundingDate = function()
{
	return this.responseObject.FundingDate;
}

/**
 * @return {string}
 */
FundingResponse.prototype.getAmount = function()
{
	return this.responseObject.Amount;
}

/**
 * @return {string}
 */
FundingResponse.prototype.getReferenceText = function()
{
	return this.responseObject.ReferenceText;
}

/**
 * @return {string}
 */
FundingResponse.prototype.getAccountNumber = function()
{
	return this.responseObject.AccountNumber;
}

/**
 * @return {string}
 */
FundingResponse.prototype.getCsvString = function()
{
	return this.merchantApi.getFundingCsv(this.responseObject.DownloadLink);
}