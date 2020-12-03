
var factory;
var papi;
var mapi;
var authResponse;

var SubscriptionTests = {
	setup : function()
	{
		factory = new RhinoAltaPayFactory(new AltaPayFactory());

		papi = factory.getProcessorApi('shop api', 'testpassword', 'https://testgateway.altapaysecure.com');
		mapi = factory.getMerchantApi('shop api', 'testpassword', 'https://testgateway.altapaysecure.com');

		var request = factory.getInitiatePaymentRequest();

		request.amount = 10;
		request.terminal = 'AltaPay Test Terminal';
		request.currency = 'EUR';
		request.creditCard.cardnum = '4111111111111111';
		request.creditCard.emonth = '11';
		request.creditCard.eyear = '2020';
		request.creditCard.cvc = '123';
		request.authType = 'subscription';
		request.shopOrderid = 'InitiatePayment_'+(new Date()).getTime();

		authResponse = papi.initiatePayment(request);

		Assert.equals(true, authResponse.success(), "Error: "+authResponse.getErrorMessage());
	},

	charge : function()
	{
		var request = factory.getChargeRequest();
		request.subscriptionPaymentId = authResponse.getPaymentId();
		request.amount = 8;
		request.reconciliationIdentifier = 'my reconciliation identifier';

		var response = mapi.chargeSubscription(request);

		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
		Assert.equals(10, response.getSubscriptionPayment().getRecurringDefaultAmount());
		Assert.equals(authResponse.getPaymentId(), response.getSubscriptionPayment().getPaymentId());
		Assert.equals(8, response.getChargePayment().getCapturedAmount());
		Assert.equals('my reconciliation identifier', response.getChargePayment().getReconciliationIdentifier());
	},

	reserveSubscriptionCharge : function()
	{
		var request = factory.getChargeRequest();
		request.subscriptionPaymentId = authResponse.getPaymentId();
		request.amount = 8;

		var response = mapi.reserveSubscriptionCharge(request);

		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
		Assert.equals(10, response.getSubscriptionPayment().getRecurringDefaultAmount());
		Assert.equals(authResponse.getPaymentId(), response.getSubscriptionPayment().getPaymentId());
		Assert.equals(8, response.getChargePayment().getReservedAmount());
		Assert.equals(0, response.getChargePayment().getCapturedAmount());
	}
};