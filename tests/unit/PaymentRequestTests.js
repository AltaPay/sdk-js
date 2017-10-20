
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
		orderLine.taxPercent = 2.33;
		orderLine.taxAmount = 12.23;
		orderLine.quantity = 4;
		orderLine.unitCode = "item";
		orderLine.unitPrice = 45.00;
		orderLine.discountPercent = 5.00;
		orderLine.imageUrl = "http://testurl/image.jpg";
		orderLine.goodsType = GoodsType.item;
		request.addOrderLine(orderLine);

		var actual = request.toHash();

		Assert.equals("item id", actual.orderLines[0].itemId);
		Assert.equals("description", actual.orderLines[0].description);
		Assert.equals(2.33, actual.orderLines[0].taxPercent);
		Assert.equals(12.23, actual.orderLines[0].taxAmount);
		Assert.equals(4, actual.orderLines[0].quantity);
		Assert.equals("item", actual.orderLines[0].unitCode);
		Assert.equals(45.00, actual.orderLines[0].unitPrice);
		Assert.equals(5.00, actual.orderLines[0].discount);
		Assert.equals("http://testurl/image.jpg", actual.orderLines[0].imageUrl);
		Assert.equals(GoodsType.item, actual.orderLines[0].goodsType);
	},
	toHash_orderLinesEmpty: function () {
		var actual = request.toHash();

		Assert.equals(null, actual.orderLines);
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
