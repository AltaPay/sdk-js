
var factory;
var papi;

var ProcessorApi_InitiatePayment = {
	setup : function()
	{
		factory = new RhinoAltaPayFactory(new AltaPayFactory());

		papi = factory.getProcessorApi('shop api', 'testpassword', 'https://vmedev.pensio.com');
	},

	initiatePayment_simple : function()
	{
		var request = factory.getInitiatePaymentRequest();

		request.amount = 1;
		request.terminal = 'AltaPay Test Terminal';
		request.currency = 'EUR';
		request.creditCard.cardnum = '4111111111111111';
		request.creditCard.emonth = '11';
		request.creditCard.eyear = '2020';
		request.creditCard.cvc = '123';
		request.shopOrderid = 'InitiatePayment_'+(new Date()).getTime();

		var response = papi.initiatePayment(request);

		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
	},

	initiatePayment_withOrderLines : function()
	{
		var request = factory.getInitiatePaymentRequest();

		request.amount = 30.30;
		request.terminal = 'AltaPay Test Terminal';
		request.currency = 'EUR';
		request.creditCard.cardnum = '4111111111111111';
		request.creditCard.emonth = '11';
		request.creditCard.eyear = '2020';
		request.creditCard.cvc = '123';
		request.shopOrderid = 'InitiatePayment_'+(new Date()).getTime();
		var line1 = factory.getOrderLine();
		line1.itemId = 'item #1';
		line1.description = 'A blue boat';
		line1.unitPrice = 10.10;
		line1.quantity = 3;
		line1.taxAmount = 4;
		line1.unitCode = 'kg';
		line1.discountPercent = 10;
		line1.imageUrl = 'http://url';
		request.addOrderLine(line1);

		var response = papi.initiatePayment(request);

		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
	},

	initiatePayment_paymentInfo : function()
	{
		var request = factory.getInitiatePaymentRequest();

		request.amount = 30.30;
		request.terminal = 'AltaPay Test Terminal';
		request.currency = 'EUR';
		request.creditCard.cardnum = '4111111111111111';
		request.creditCard.emonth = '11';
		request.creditCard.eyear = '2020';
		request.creditCard.cvc = '123';
		request.shopOrderid = 'InitiatePayment_'+(new Date()).getTime();
		request.addPaymentInfo('wah wah', 'hat');
		request.addPaymentInfo('another', 'payment info');

		var response = papi.initiatePayment(request);

		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
		Assert.equals('hat', response.getPaymentInfo('wah_wah'));
		Assert.equals('payment info', response.getPaymentInfo('another'));
	},

	initiatePayment_reconciliationIdentifier : function()
	{
		var request = factory.getInitiatePaymentRequest();

		request.amount = 30.30;
		request.terminal = 'AltaPay Test Terminal';
		request.currency = 'EUR';
		request.creditCard.cardnum = '4111111111111111';
		request.creditCard.emonth = '11';
		request.creditCard.eyear = '2020';
		request.creditCard.cvc = '123';
		request.shopOrderid = 'InitiatePayment_'+(new Date()).getTime();
		request.saleReconciliationIdentifier = 'my identifier yo';
		request.authType = 'paymentAndCapture';
		request.paymentSource = 'eCommerce';

		var response = papi.initiatePayment(request);

		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
		Assert.equals('my identifier yo', response.getReconciliationIdentifier());
	},

	initiatePayment_customerInfo : function()
	{
		var request = factory.getInitiatePaymentRequest();

		request.amount = 30.30;
		request.terminal = 'AltaPay Test Terminal';
		request.currency = 'EUR';
		request.creditCard.cardnum = '4111111111111111';
		request.creditCard.emonth = '11';
		request.creditCard.eyear = '2020';
		request.creditCard.cvc = '123';
		request.shopOrderid = 'InitiatePayment_'+(new Date()).getTime();
		request.customerInfo.email = 'my@e.mail';
		request.customerInfo.username = 'username';
		request.customerInfo.customerPhone = 'phone';
		request.customerInfo.bankName = 'bank name';
		request.customerInfo.bankPhone = 'bank phone';
		request.customerInfo.billingAddress.firstName = 'billing first name';
		request.customerInfo.billingAddress.lastName = 'billing last name';
		request.customerInfo.billingAddress.address = 'billing address';
		request.customerInfo.billingAddress.city = 'billing city';
		request.customerInfo.billingAddress.region = 'billing region';
		request.customerInfo.billingAddress.postalCode = 'billing postal';
		request.customerInfo.billingAddress.country = 'DK';
		request.customerInfo.shippingAddress.firstName = 'shipping first name';
		request.customerInfo.shippingAddress.lastName = 'shipping last name';
		request.customerInfo.shippingAddress.address = 'shipping address';
		request.customerInfo.shippingAddress.city = 'shipping city';
		request.customerInfo.shippingAddress.region = 'shipping region';
		request.customerInfo.shippingAddress.postalCode = 'shipping postal';
		request.customerInfo.shippingAddress.country = 'DK';

		var response = papi.initiatePayment(request);

		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
	},

	initiatePayment_fraudService : function()
	{
		var request = factory.getInitiatePaymentRequest();

		request.amount = 101;
		request.terminal = 'AltaPay Test Terminal';
		request.currency = 'EUR';
		request.creditCard.cardnum = '4111111111111111';
		request.creditCard.emonth = '11';
		request.creditCard.eyear = '2020';
		request.creditCard.cvc = '123';
		request.shopOrderid = 'InitiatePayment_'+(new Date()).getTime();
		request.customerInfo.billingAddress.firstName = 'billing first name';
		request.customerInfo.billingAddress.lastName = 'billing last name';
		request.customerInfo.billingAddress.address = 'billing address';
		request.customerInfo.billingAddress.city = 'billing city';
		request.customerInfo.billingAddress.region = 'billing region';
		request.customerInfo.billingAddress.postalCode = 'billing postal';
		request.customerInfo.billingAddress.country = 'DK';
		request.fraudService = 'test';

		var response = papi.initiatePayment(request);

		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
		Assert.equals(FraudRecommendation.Accept, response.getFraudRecommendation());
	},

	initiatePayment_3dSecureFlow : function()
	{
		var request = factory.getInitiatePaymentRequest();

		request.amount = 5.68;
		request.terminal = 'AltaPay Test 3DSecure Terminal';
		request.currency = 'EUR';
		request.creditCard.cardnum = '4111111111111111';
		request.creditCard.emonth = '11';
		request.creditCard.eyear = '2020';
		request.creditCard.cvc = '123';
		request.shopOrderid = 'InitiatePayment3dSecureFlow_'+(new Date()).getTime();

		var response = papi.initiatePayment(request);

		Assert.equals(true, response.threeDSecure(), "Error: "+response.getErrorMessage());
		Assert.equals('testbank', response.getRedirectUrl().match(/testbank/));
		Assert.equals('WorkingPaReq', response.getPaReq());

		var verifyRequest = factory.getVerify3dSecureRequest(response.getTransactionId(), 'WorkingPaRes');
		//verifyRequest.paymentId = response.getTransactionId();
		//verifyRequest.paRes = 'WorkingPaRes';

		var verifyResponse = papi.verify3dSecure(verifyRequest);

		Assert.equals(true, verifyResponse.success(), "Error: "+response.getErrorMessage());
	}



};