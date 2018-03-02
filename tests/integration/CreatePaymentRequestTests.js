
var factory;
var mapi;

var CreatePaymentRequestTests = {
	setup : function()
	{
		factory = new RhinoAltaPayFactory(new AltaPayFactory());

		mapi = factory.getMerchantApi('shop api', 'testpassword', 'https://vmedev.pensio.com');
	},

	simple : function()
	{
		var request = factory.getPaymentRequest();
		request.terminal = 'AltaPay Test Terminal';
		request.shopOrderid = 'CreatePaymentRequestSimple_'+(new Date()).getTime();
		request.amount = '20.15';
		request.currency = 'EUR';

		var response = mapi.createPaymentRequest(request);
		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());
	},

	allParameters : function()
	{
		var request = factory.getPaymentRequest();
		//PaymentRequestBase
		request.terminal = 'AltaPay Soap Test Terminal';
		request.shop_orderid = 'CreatePaymentRequestAllParameters_'+(new Date()).getTime();
		request.amount = '120.15';
		request.currency = 'EUR';

		request.language = 'en';
		request.authType = 'payment';
		request.creditCardToken = 'creditCardToken';
		request.cookie = 'mycookievalue';
		request.fraudService = 'test';

		//PaymentRequest
		request.saleReconciliationIdentifier = '74818181818';
		request.salesInvoiceNumber = '654888818';
		request.salesTax = '1.00';
		request.customerCreatedDate = '2015-11-10';

		var orderLine = factory.getOrderLine();
		orderLine.description = 'description';
		orderLine.itemId = '222';
		orderLine.quantity = '1';
		orderLine.taxPercent = '1.23';
		orderLine.taxAmount = '3.23';
		orderLine.unitCode = '654';
		orderLine.unitPrice = '10.03';
		orderLine.discountPercent = '1.03';
		orderLine.goodsType = GoodsType.item;
		request.addOrderLine(orderLine);
		request.shippingMethod = 'LowCost';
		request.organisationNumber = '123123123';
		request.accountOffer = 'required';
		request.paymentSource = 'eCommerce';

		request.customerInfo.email = 'my@e.mail';
		request.customerInfo.username = 'username';
		request.customerInfo.customerPhone = 'phone';
		request.customerInfo.bankName = 'bank name';
		request.customerInfo.bankPhone = 'bank phone';
		request.customerInfo.billingAddress.firstName = 'billing first name';
		request.customerInfo.billingAddress.lastName = 'billing last name';
		request.customerInfo.billingAddress.address = 'billing address';
		request.customerInfo.billingAddress.city = 'billing city';
		request.customerInfo.billingAddress.region = 'billing region';
		request.customerInfo.billingAddress.postalCode = 'billing postal';
		request.customerInfo.billingAddress.country = 'DK';
		request.customerInfo.shippingAddress.firstName = 'shipping first name';
		request.customerInfo.shippingAddress.lastName = 'shipping last name';
		request.customerInfo.shippingAddress.address = 'shipping address';
		request.customerInfo.shippingAddress.city = 'shipping city';
		request.customerInfo.shippingAddress.region = 'shipping region';
		request.customerInfo.shippingAddress.postalCode = 'shipping postal';
		request.customerInfo.shippingAddress.country = 'DK';

		var response = mapi.createPaymentRequest(request);

		Assert.equals(true, response.success(), "Error: "+response.getErrorMessage());

		Assert.equals(true, response.getUrl().contains("://vmedev.pensio.com"), "Url was: "+response.getUrl() );
	}
}



