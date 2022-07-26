
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

		var request = factory.getReservationRequest();

		request.amount = 7;
		request.terminal = 'AltaPay Test Terminal';
		request.currency = 'EUR';
		request.cardnum = '4111111111111111';
		request.emonth = '11';
		request.eyear = '2025';
		request.cvc = '123';
		request.type = AuthType.subscription;
		request.shopOrderid = 'JS_AUI_IT_'+(new Date()).getTime();
		var agreementConfig = factory.getAgreementConfig();
		agreementConfig.agreementType = AgreementType.unscheduled;
		agreementConfig.agreementUnscheduledType = AgreementUnscheduledType.incremental;
		request.agreementConfig = agreementConfig;

		authResponse = mapi.reservation(request);

		Assert.equals(true, authResponse.success(), "Error: "+authResponse.getErrorMessage());
	},

	charge : function()
	{
		var request = factory.getChargeRequest();
		request.subscriptionPaymentId = authResponse.getPaymentId();
		request.amount = 3;
		request.reconciliationIdentifier = 'my reconciliation identifier';

		var response = mapi.chargeSubscription(request);

		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
		Assert.equals(7, response.getSubscriptionPayment().getRecurringDefaultAmount());
		Assert.equals(authResponse.getPaymentId(), response.getSubscriptionPayment().getPaymentId());
		Assert.equals(3, response.getChargePayment().getCapturedAmount());
		Assert.equals('my reconciliation identifier', response.getChargePayment().getReconciliationIdentifier());
	},

	reserveSubscriptionChargeAndCaptureReservation : function()
	{
		var request = factory.getChargeRequest();
		request.subscriptionPaymentId = authResponse.getPaymentId();
		request.amount = 3;
		request.agreementUnscheduledType = AgreementUnscheduledType.incremental;

		var response = mapi.reserveSubscriptionCharge(request);

		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
		Assert.equals(7, response.getSubscriptionPayment().getRecurringDefaultAmount());
		Assert.equals(authResponse.getPaymentId(), response.getSubscriptionPayment().getPaymentId());
		Assert.equals(3, response.getChargePayment().getReservedAmount());
		Assert.equals(0, response.getChargePayment().getCapturedAmount());

		request = factory.getCaptureRequest();
		request.paymentId = response.getChargePayment().getPaymentId();
		request.amount = 3;

		response = mapi.capture(request);

		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
		Assert.equals(3, response.getCapturedAmount());

	}
};