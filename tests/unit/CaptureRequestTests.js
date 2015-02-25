
var orderLine;
var orderLine2;
var factory;

var CaptureRequestTests = {
	setup : function()
	{
		factory = new UnitTestAltaPayFactory();

		orderLine = JsMockito.mock(factory.getOrderLine());
		orderLine2 = JsMockito.mock(factory.getOrderLine());
	},

	toHash_tranformPaymentId : function()
	{
		var request = factory.getCaptureRequest();
		request.paymentId = 234;

		var actual = request.toHash();

		Assert.equals('234',actual.transaction_id);
	},

	toHash_tranformOtherNonOrderLineFields : function()
	{
		var request = factory.getCaptureRequest();
		request.amount = 344.56;
		request.reconciliationIdentifier = 'identifier';
		request.invoiceNumber = 'invoice no#';
		request.salesTax = 23.45;

		var actual = request.toHash();

		Assert.equals('344.56',actual.amount);
		Assert.equals('identifier',actual.reconciliation_identifier);
		Assert.equals('23.45',actual.sales_tax);
		Assert.equals('invoice no#',actual.invoice_number);
	},

	toHash_tranformOrderLines : function()
	{
		var request = factory.getCaptureRequest();

		request.addOrderLine(orderLine);
		var orderLineHash = {itemId:'item id#'};
		JsMockito.when(orderLine).toHash().thenReturn(orderLineHash);

		request.addOrderLine(orderLine2);
		var orderLineHash2 = {itemId:'item id# 2'};
		JsMockito.when(orderLine2).toHash().thenReturn(orderLineHash2);

		var actual = request.toHash();

		Assert.equals(2,actual.orderLines.length);
		Assert.equals(orderLineHash,actual.orderLines[0]);
		Assert.equals(orderLineHash2,actual.orderLines[1]);
	},

	toHash_doNotTranformOrderLines_whenThereAreNone : function()
	{
		var request = factory.getCaptureRequest();

		var actual = request.toHash();

		Assert.equals(null,actual.orderLines);
	},

	toHash_doesNotSetFunctionsOnHash : function()
	{
		var request = factory.getCaptureRequest();

		var actual = request.toHash();

		Assert.equals(null,actual.toHash);
	}

};
