
var factory;
var papi;

var ProcessorApi_InitiatePayment = {
	setup : function()
	{
		factory = new RhinoAltaPayFactory(new AltaPayFactory());

		papi = factory.getProcessorApi('shop api', 'testpassword', 'http://gateway.dev.pensio.com');
	},

	initiatePayment_simple : function()
	{
		var request = factory.getInitiatePaymentRequest();

		request.amount = 1;
		request.terminal = 'AltaPay Test Terminal';
		request.currency = 'EUR';
		request.creditCard.cardnum = '4561234561234561';
		request.creditCard.emonth = '11';
		request.creditCard.eyear = '2020';
		request.creditCard.cvc = '123';
		request.shopOrderid = 'InitiatePayment_'+(new Date()).getTime();

		var response = papi.initiatePayment(request);

		Assert.equals(true, response.success());
	},

	initiatePayment_withOrderLines : function()
	{
		var request = factory.getInitiatePaymentRequest();

		request.amount = 30.30;
		request.terminal = 'AltaPay Test Terminal';
		request.currency = 'EUR';
		request.creditCard.cardnum = '4561234561234561';
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

		Assert.equals(true, response.success());
	},

	initiatePayment_paymentInfo : function()
	{
		var request = factory.getInitiatePaymentRequest();

		request.amount = 30.30;
		request.terminal = 'AltaPay Test Terminal';
		request.currency = 'EUR';
		request.creditCard.cardnum = '4561234561234561';
		request.creditCard.emonth = '11';
		request.creditCard.eyear = '2020';
		request.creditCard.cvc = '123';
		request.shopOrderid = 'InitiatePayment_'+(new Date()).getTime();
		request.addPaymentInfo('wah wah', 'hat');
		request.addPaymentInfo('another', 'payment info');

		var response = papi.initiatePayment(request);

		Assert.equals(true, response.success());
		Assert.equals('hat', response.getPaymentInfo('wah_wah'));
		Assert.equals('payment info', response.getPaymentInfo('another'));
	},

	initiatePayment_reconciliationIdentifier : function()
	{
		var request = factory.getInitiatePaymentRequest();

		request.amount = 30.30;
		request.terminal = 'AltaPay Test Terminal';
		request.currency = 'EUR';
		request.creditCard.cardnum = '4561234561234561';
		request.creditCard.emonth = '11';
		request.creditCard.eyear = '2020';
		request.creditCard.cvc = '123';
		request.shopOrderid = 'InitiatePayment_'+(new Date()).getTime();
		request.saleReconciliationIdentifier = 'my identifier yo';
		request.authType = 'paymentAndCapture';

		var response = papi.initiatePayment(request);

		Assert.equals(true, response.success());
		Assert.equals('my identifier yo', response.getReconciliationIdentifier());
	}



};