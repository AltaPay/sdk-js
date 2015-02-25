
var factory;
var papi;

var ProcessorApi_InitiatePayment = {
	setup : function()
	{
		factory = new RhinoAltaPayFactory(new AltaPayFactory());

		papi = factory.getProcessorApi('shop api', 'testpassword', 'http://gateway.dev.pensio.com');
	},

	initiatePayment_ : function()
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
	}

};