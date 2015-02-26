/**
 *
 * @param responseObject {object}
 * @param merchantApi {MerchantApi}
 * @param responseFactory {ResponseFactory}
 * @constructor
 */
function FundingResponse(responseObject, merchantApi, responseFactory)
{
	this.responseObject = responseObject;
	this.merchantApi = merchantApi;
	this.responseFactory = responseFactory;
}

/**
 * @return {string}
 */
FundingResponse.prototype.getFilename = function()
{
	return this.responseObject.Filename;
};

/**
 * @return {string}
 */
FundingResponse.prototype.getContractIdentifier = function()
{
	return this.responseObject.ContractIdentifier;
};

/**
 * @return {string}
 */
FundingResponse.prototype.getAcquirer = function()
{
	return this.responseObject.Acquirer;
};

/**
 * @return {string}
 */
FundingResponse.prototype.getFundingDate = function()
{
	return this.responseObject.FundingDate;
};

/**
 * @return {number}
 */
FundingResponse.prototype.getAmount = function()
{
	return this.responseObject.Amount;
};

/**
 * @return {string}
 */
FundingResponse.prototype.getReferenceText = function()
{
	return this.responseObject.ReferenceText;
};

/**
 * @return {string}
 */
FundingResponse.prototype.getAccountNumber = function()
{
	return this.responseObject.AccountNumber;
};

/**
 * @return {string}
 */
FundingResponse.prototype.getCsvString = function()
{
	return this.merchantApi.getFundingCsv(this.responseObject.DownloadLink);
};

/**
 * @return {FundingRecord[]}
 */
FundingResponse.prototype.getFundingRecords = function()
{
	var csv = this.getCsvString();
	var csvArray = CsvHelper.csvToArray(csv,";");
	var headers = csvArray[0];
	var result = [];
	for(var i=1;i<csvArray.length;i++)
	{
		if(csvArray[i].length == headers.length)
		{
			result.push(this.responseFactory.getFundingRecord(CsvHelper.combine(headers, csvArray[i])));
		}
	}
	return result;
};