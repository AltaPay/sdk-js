var factory;
var request;

var CheckoutSessionRequestTests = {

	setup: function () {
		factory = new UnitTestAltaPayFactory();
		request = factory.getCheckoutSessionRequest();
	},

	toHash_terminals: function () {
		request.addTerminal("term1");
		request.addTerminal("term2");

		var actual = request.toHash();

		Assert.equals("term1", actual.terminals[0]);
		Assert.equals("term2", actual.terminals[1]);
	},
	
	toHash_terminalsEmpty: function () {
		var actual = request.toHash();

		Assert.equals(undefined, actual.terminals);
	},
	
	transformHashKey_terminals: function(){
		var actual = request.transformHashKey('terminals');

		Assert.equals("terminals", actual);
	}
};
