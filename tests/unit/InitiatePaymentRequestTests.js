
var factory;
var request;

var InitiatePaymentRequestTests = {

	setup: function () {
		factory = new UnitTestAltaPayFactory();
		request = factory.getInitiatePaymentRequest();
	},

	toHash_orderLines: function () {
		var orderLine = factory.getOrderLine();
		orderLine.itemId = "item id";
		orderLine.description = "description";
		request.addOrderLine(orderLine);

		var actual = request.toHash();

		Assert.equals("item id", actual.orderLines[0].itemId);
		Assert.equals("description", actual.orderLines[0].description);
	}

};