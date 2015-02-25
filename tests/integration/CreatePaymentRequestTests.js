
var CreatePaymentRequestTests = {
	simple : function()
	{
		var factory = new RhinoAltaPayFactory(new AltaPayFactory());

		var mapi = factory.getMerchantApi('shop api', 'testpassword', 'http://gateway.dev.pensio.com');

		var request = factory.getPaymentRequest();
		request.terminal = 'AltaPay Soap Test Terminal';
		request.shopOrderid = 'CreatePaymentRequestSimple_'+(new Date()).getTime();
		request.amount = '20.15';
		request.currency = 'EUR';

		var response = mapi.createPaymentRequest(request);
		Assert.equals(true, response.success())
	}

}



