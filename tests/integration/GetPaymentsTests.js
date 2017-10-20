
var factory;
var papi;
var mapi;
var authResponse;

var GetPaymentsTests = {
	setup : function()
	{
		factory = new RhinoAltaPayFactory(new AltaPayFactory());

		papi = factory.getProcessorApi('shop api', 'testpassword', 'https://vmedev.pensio.com');
		mapi = factory.getMerchantApi('shop api', 'testpassword', 'https://vmedev.pensio.com');

		var request = factory.getInitiatePaymentRequest();

		request.amount = 10;
		request.terminal = 'AltaPay Test Terminal';
		request.currency = 'EUR';
		request.creditCard.cardnum = '4111111111111111';
		request.creditCard.emonth = '11';
		request.creditCard.eyear = '2020';
		request.creditCard.cvc = '123';
		request.shopOrderid = 'GetPayments_'+(new Date()).getTime();

		authResponse = papi.initiatePayment(request);

		Assert.equals(true, authResponse.success(), "Error: "+authResponse.getErrorMessage());
	},

	getPayments : function()
	{
		// We sleep for 3 seconds, to ensure the reporting database (from which this information is fetched) is populated.
		java.lang.Thread.sleep(3000);

		var request = factory.getPaymentsRequest();
		request.transactionId = authResponse.getTransactionId();

		var paymentsResponse = mapi.getPayments(request);

		Assert.equals(1, paymentsResponse.length())
		var payments = paymentsResponse.getPayments();
		for(var k in payments)
		{
			Assert.equals(10, payments[k].getReservedAmount());
		}

	}
};