
var factory;
var mapi;

var FundingsTests = {
	setup : function()
	{
		factory = new RhinoAltaPayFactory(new AltaPayFactory());
		mapi = factory.getMerchantApi('shop api', 'testpassword', 'https://vmedev.pensio.com');
	},

	getFundings : function()
	{
		var request = factory.getFundingsRequest();

		var response = mapi.getFundings(request);

		var fundings = response.getFundings();
		for(var k in fundings)
		{
			console.log(fundings[k].getFilename());
			console.log(fundings[k].getCsvString());
			return; // We dont want to print more than one funding, as this list potentially can be very long
					// and thus make the test very slow.
		}
		// I have not added any asserts as that requires something to assert against, which will always be there.
	}

}