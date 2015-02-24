
function CaptureResponse(responseObject) {
	this.responseObject = responseObject;
}

CaptureResponse.prototype.getResponseObject = function()
{
	return this.responseObject;
}

CaptureResponse.prototype.success = function()
{
	return this.responseObject.Header.ErrorCode == 0 && this.responseObject.Body.Result == 'Success';
}

CaptureResponse.prototype.getReconciliationIdentifier = function()
{
	var identifiers = this.responseObject.Body.Transactions.Transaction.ReconciliationIdentifiers.ReconciliationIdentifier;

	if(Object.prototype.toString.call( identifiers ) === '[object Array]' )
	{
		return identifiers[identifiers.length - 1].Id;
	}
	else
	{
		return identifiers.Id;
	}
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