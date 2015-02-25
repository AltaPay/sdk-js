
var request;

var InitiatePaymentRequestTests = {

	setup : function()
	{
		request = new InitiatePaymentRequest(new BaseRequest(), new PaymentRequestBase(new PaymentRequestConfig()), new CustomerInfo(new CustomerAddress(), new CustomerAddress()), new CreditCard(new BaseRequest()));
	},

	toHash_orderLines : function()
	{
		var orderLine = new OrderLine(new BaseRequest());
		orderLine.itemId = "item id";
		orderLine.description = "description";
		request.addOrderLine(orderLine);

		var actual = request.toHash();

		Assert.equals("item id",actual.orderLines[0].itemId);
		Assert.equals("description",actual.orderLines[0].description);
	}

};