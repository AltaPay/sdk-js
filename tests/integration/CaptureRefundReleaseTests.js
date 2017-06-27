
var factory;
var papi;
var mapi;
var authResponse;

var CaptureRefundReleaseTests = {
	setup : function()
	{
		factory = new RhinoAltaPayFactory(new AltaPayFactory());

		papi = factory.getProcessorApi('shop api', 'testpassword', 'http://gateway.dev.earth.pensio.com');
		mapi = factory.getMerchantApi('shop api', 'testpassword', 'http://gateway.dev.earth.pensio.com');

		var request = factory.getInitiatePaymentRequest();

		request.amount = 10;
		request.terminal = 'AltaPay Test Terminal';
		request.currency = 'EUR';
		request.creditCard.cardnum = '4111111111111111';
		request.creditCard.emonth = '11';
		request.creditCard.eyear = '2020';
		request.creditCard.cvc = '123';
		request.shopOrderid = 'InitiatePayment_'+(new Date()).getTime();

		authResponse = papi.initiatePayment(request);

		Assert.equals(true, authResponse.success(), "Error: "+authResponse.getErrorMessage());
	},

	capture : function()
	{
		var request = factory.getCaptureRequest();
		request.paymentId = authResponse.getPaymentId();
		request.amount = 8;

		var response = mapi.capture(request);

		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
		Assert.equals(8, response.getCapturedAmount());
	},

	captureAndRefund : function()
	{
		var request = factory.getCaptureRequest();
		request.paymentId = authResponse.getPaymentId();
		request.amount = 8;

		var response = mapi.capture(request);

		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());

		var refundRequest = factory.getRefundRequest();
		refundRequest.paymentId = authResponse.getPaymentId();
		refundRequest.amount = 6;

		var response = mapi.refund(refundRequest);

		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
		Assert.equals(6, response.getRefundedAmount());
	},

	release : function()
	{
		var request = factory.getReleaseRequest();
		request.paymentId = authResponse.getPaymentId();

		var response = mapi.release(request);

		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
		Assert.equals(0, response.getCapturedAmount());
		Assert.equals(10, response.getReservedAmount());
	}


};