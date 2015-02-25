/**
 * @extends BaseResponse
 * @extends BaseTransactionResponse
 * @param responseObject
 * @constructor
 */
function CaptureResponse(responseObject) {
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
	ObjectHelper.extend(this, new BaseTransactionResponse());
}

/**
 * @return {CustomerAddress}
 */
CaptureResponse.prototype.getRegisteredAddress = function()
{
	var customerInfo = this.responseObject.Body.Transactions.Transaction.CustomerInfo;
	if(customerInfo == null)
	{
		return null;
	}
	var registeredAddress = customerInfo.RegisteredAddress;
	if(registeredAddress == null)
	{
		return null;
	}

	var address = new CustomerAddress();
	address.firstName = registeredAddress.Firstname;
	address.lastName = registeredAddress.Lastname;
	address.address = registeredAddress.Address;
	address.city = registeredAddress.City;
	address.region = registeredAddress.Region;
	address.country = registeredAddress.Country;
	address.postalCode = registeredAddress.PostalCode;

	return address;
}