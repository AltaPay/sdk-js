
var orderLine;
var orderLine2;

var RefundRequestTests = {

	setup : function()
	{
		orderLine = JsMockito.mock(new OrderLine(new BaseRequest()));
		orderLine2 = JsMockito.mock(new OrderLine(new BaseRequest()));
	},

	toHash_tranformPaymentId : function()
	{
		var request = new RefundRequest();
		request.paymentId = 234;

		var actual = request.toHash();

		Assert.equals('234',actual.transaction_id);
	},

	toHash_tranformOtherNonOrderLineFields : function()
	{
		var request = new RefundRequest();
		request.amount = 344.56;
		request.reconciliationIdentifier = 'identifier';
		request.invoiceNumber = 'invoice no#';
		request.allowOverRefund = true;

		var actual = request.toHash();

		Assert.equals('344.56',actual.amount);
		Assert.equals('identifier',actual.reconciliation_identifier);
		Assert.equals('true',actual.allow_over_refund);
		Assert.equals('invoice no#',actual.invoice_number);
	},

	toHash_tranformOrderLines : function()
	{
		var request = new RefundRequest();

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
		var request = new RefundRequest();

		var actual = request.toHash();

		Assert.equals(null,actual.orderLines);
	},

	toHash_doesNotSetFunctionsOnHash : function()
	{
		var request = new RefundRequest();

		var actual = request.toHash();

		Assert.equals(null,actual.toHash);
	}

}