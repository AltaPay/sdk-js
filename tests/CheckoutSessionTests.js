var factory;
var mapi;

var CheckoutSessionTests = {
	setup : function()
	{
		factory = new RhinoAltaPayFactory(new AltaPayFactory());
		mapi = factory.getMerchantApi('shop api', 'testpassword', 'https://testgateway.altapaysecure.com');
	},

	simple : function()
	{
		var request = factory.getCheckoutSessionRequest();
		request.terminal = 'AltaPay Test Terminal';
		request.shopOrderid = 'CheckoutSessionTestSimple_'+(new Date()).getTime();
		request.amount = '20.15';
		request.currency = 'EUR';
		request.sessionId = 'session_' + (new Date()).getTime();
		request.addTerminal('AltaPay Test Terminal');

		var response = mapi.checkoutSession(request);
		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
		Assert.assertTrue(response.getSessionId() != null, "SessionId should not be null");
		Assert.equals("CREATED", response.getSessionStatus());
	},
	
	failsOnDuplicateSessionId : function()
	{
		var sessionId = 'session_' + (new Date()).getTime();
		
		var request = factory.getCheckoutSessionRequest();
		request.terminal = 'AltaPay Test Terminal';
		request.shopOrderid = 'CheckoutSessionTestDupe_'+(new Date()).getTime();
		request.amount = '20.15';
		request.currency = 'EUR';
		request.sessionId = sessionId;
		request.addTerminal('AltaPay Test Terminal');

		var response = mapi.checkoutSession(request);
		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
		
		// Second call with same SessionId should fail
		var response2 = mapi.checkoutSession(request);
		Assert.equals(false, response2.success(), "Second call should have failed");
		Assert.assertTrue(response2.getErrorMessage().indexOf('already exists') > -1 || response2.getErrorMessage() !== null, "Should return an error message");
	}
};
