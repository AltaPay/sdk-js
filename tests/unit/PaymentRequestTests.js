
var factory;
var request;

var PaymentRequestTests = {
	setup: function () {
		factory = new UnitTestAltaPayFactory();
		request = factory.getPaymentRequest();
	},

	toHash_orderLines: function () {
		var orderLine = factory.getOrderLine();
		orderLine.itemId = "item id";
		orderLine.description = "description";
		request.addOrderLine(orderLine);

		var actual = request.toHash();

		Assert.equals("item id", actual.orderLines[0].itemId);
		Assert.equals("description", actual.orderLines[0].description);
	},
	transformHashKey_paymentInfos: function(){
		var actual = request.transformHashKey('paymentInfos');

		Assert.equals("transaction_info", actual);
	},
	transformHashKey_requestConfig: function(){
		var actual = request.transformHashKey('requestConfig');

		Assert.equals("config", actual);
	},
	transformHashKey_orderLines: function(){
		var actual = request.transformHashKey('orderLines');

		Assert.equals("orderLines", actual);
	},
	transformHashKey_authType: function(){
		var actual = request.transformHashKey('authType');

		Assert.equals("type", actual);
	},
	transformHashKey_anyOtherKey: function(){
		var actual = request.transformHashKey('anyOtherKey');

		Assert.equals("any_other_key", actual);
	}

};
