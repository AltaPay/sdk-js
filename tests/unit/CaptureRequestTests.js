
var orderLine;
var orderLine2;

var CaptureRequestTests = {
	setup : function()
	{
		orderLine = JsMockito.mock(OrderLine);
		orderLine2 = JsMockito.mock(OrderLine);
	},

	toHash_tranformPaymentId : function()
	{
		var request = new CaptureRequest();
		request.paymentId = 234;

		var actual = request.toHash();

		Assert.equals('234',actual.transaction_id);
	},

	toHash_tranformOtherNonOrderLineFields : function()
	{
		var request = new CaptureRequest();
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
		var request = new CaptureRequest();

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
		var request = new CaptureRequest();

		var actual = request.toHash();

		Assert.equals(null,actual.orderLines);
	},

	toHash_doesNotSetFunctionsOnHash : function()
	{
		var request = new CaptureRequest();

		var actual = request.toHash();

		Assert.equals(null,actual.toHash);
	}

};
