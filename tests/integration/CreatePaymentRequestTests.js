
var CreatePaymentRequestTests = {
	simple : function()
	{
		var factory = new RhinoAltaPayFactory(new AltaPayFactory());

		var mapi = factory.getMerchantApi('shop api', 'testpassword', 'http://gateway.dev.pensio.com');

		var request = factory.getPaymentRequest();
		request.terminal = 'AltaPay Soap Test Terminal';
		request.shopOrderid = 'CreatePaymentRequestSimple_'+(new Date()).getTime();
		request.amount = '20.15';
		request.currency = 'EUR';

		var response = mapi.createPaymentRequest(request);
		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
	},

	allParameters : function()
	{
		var factory = new RhinoAltaPayFactory(new AltaPayFactory());

		var mapi = factory.getMerchantApi('shop api', 'testpassword', 'http://gateway4.rolandas.earth.pensio.com');

		var request = factory.getPaymentRequest();
		//PaymentRequestBase
		request.terminal = 'AltaPay Soap Test Terminal';
		request.shop_orderid = 'CreatePaymentRequestSimple_'+(new Date()).getTime();
		request.amount = '120.15';
		request.currency = 'EUR';

		request.language = 'en';
		request.authType = 'payment';
		request.creditCardToken = 'creditCardToken';
		request.cookie = 'mycookievalue';
		request.fraudService = 'red';

		//PaymentRequest
		request.saleReconciliationIdentifier = '74818181818';
		request.salesInvoiceNumber = '654888818';
		request.salesTax = '1.00';
		request.customerCreatedDate = new Date('2015', '02', '28', '10', '10', '10');

		var orderLine = AltaPayFactory.prototype.getOrderLine();
		orderLine.description = 'description';
		orderLine.itemId = '222';
		orderLine.quantity = '1';
		orderLine.taxPercent = '1.23';
		orderLine.unitCode = '654';
		orderLine.unitPrice = '10.03';
		orderLine.discountPercent = '1.03';
		orderLine.goodsType = GoodsType.item;
		request.addOrderLine(orderLine);
		request.shippingMethod = 'LowCost';
		request.organisationNumber = '123123123';
		request.accountOffer = 'required';

		var response = mapi.createPaymentRequest(request);

		console.logObject(response.getResponseObject());
		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
	}
}



