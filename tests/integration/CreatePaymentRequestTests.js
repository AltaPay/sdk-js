
var CreatePaymentRequestTests = {
	simple : function()
	{
		var factory = new RhinoAltaPayFactory(new AltaPayFactory());

		var mapi = factory.getMerchantApi('shop api', 'testpassword', 'http://gateway.dev.earth.pensio.com');

		var request = factory.getPaymentRequest();
		request.terminal = 'AltaPay Soap Test Terminal';
		request.shop_orderid = 'CreatePaymentRequestSimple_'+(new Date()).getTime();
		request.amount = '20.15';
		request.currency = 'EUR';

		var response = mapi.createPaymentRequest(request);
	}

}



