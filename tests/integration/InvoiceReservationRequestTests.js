
var factory;
var mapi;

var InvoiceReservationRequestTests = {
	setup : function()
	{
		factory = new RhinoAltaPayFactory(new AltaPayFactory());

		mapi = factory.getMerchantApi('shop api', 'testpassword', 'https://testgateway.altapaysecure.com');
		//mapi = factory.getMerchantApi('shop api', 'testpassword', 'http://gateway.lb.earth.pensio.com');

	},

	simple : function()
	{
		var request = factory.getInvoiceReservationRequest();

		request.terminal = 'AltaPay Test Invoice Terminal DK';
		request.shopOrderid = 'InvoiceReservationTestSimple_' + (new Date()).getTime();
		request.amount = '123.15';
		request.currency = 'DKK';
		request.customerInfo.billingAddress.address = 'billing address';
		request.customerInfo.billingAddress.postalCode = 'billing postal';
		request.customerInfo.email = 'email@xyz.com';

		var response = mapi.createInvoiceReservation(request);

		Assert.equals(true, response.success(), "Error: " + response.getErrorMessage());

		Assert.equals(request.terminal, response.getPayment(0).responseObject.Terminal, "Terminal doesn't match");
		Assert.equals(request.shopOrderid, response.getPayment(0).responseObject.ShopOrderId, "ShopOrderId doesn't match");
		Assert.equals(request.customerInfo.billingAddress.address, response.getPayment(0).responseObject.CustomerInfo.BillingAddress.Address, "Address doesn't match");
		Assert.equals(request.customerInfo.billingAddress.postalCode, response.getPayment(0).responseObject.CustomerInfo.BillingAddress.PostalCode, "PostalCode doesn't match");
		Assert.equals(request.customerInfo.email, response.getPayment(0).responseObject.CustomerInfo.Email, "Email doesn't match");
	},

	allParameters : function()
	{
		var request = factory.getInvoiceReservationRequest();

		request.terminal = 'AltaPay Test Invoice Terminal DK';
		request.shopOrderid = 'InvoiceReservationTestAllParams_' + (new Date()).getTime();
		request.amount = '123.15';
		request.currency = 'DKK';

		request.type = 'payment';
		request.transaction_info = ['aaa', 'bbb'];
		request.accountNumber = '999';
		request.bankCode = '888';
		request.fraud_service = 'none';
		request.payment_source = '666';
		request.organisationNumber = '555';
		request.personalIdentifyNumber = '444';
		request.birthDate = '11';

		// orderLine:
		var orderLine = factory.getOrderLine();
		orderLine.description = 'description';
		orderLine.itemId = '222';
		orderLine.quantity = '1';
		orderLine.taxPercent = '1.23';
		orderLine.taxAmount = '4.55';
		orderLine.unitCode = '654';
		orderLine.unitPrice = '10.03';
		orderLine.discountPercent = '1.03';
		orderLine.goodsType = GoodsType.item;
		request.addOrderLine(orderLine);

		// customerInfo:
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

		var response = mapi.createInvoiceReservation(request);

        var responseObject = response.getPayment(0).responseObject;

		Assert.equals(true, response.success(), "Error: " + response.getErrorMessage());

		Assert.equals(request.terminal, responseObject.Terminal, "Terminal doesn't match");
		Assert.equals(request.shopOrderid, responseObject.ShopOrderId, "ShopOrderId doesn't match");

		Assert.equals(request.type, responseObject.AuthType, "type doesn't match");

		Assert.equals(request.transaction_info[0], response.getPayment(0).responseObject.PaymentInfos.PaymentInfo[0]['@'], "PaymentInfo[0] doesn't match");
		Assert.equals(request.transaction_info[1], response.getPayment(0).responseObject.PaymentInfos.PaymentInfo[1]['@'], "PaymentInfo[1] doesn't match");

		var customerInfo = responseObject.CustomerInfo;

        Assert.equals(request.customerInfo.email, customerInfo.Email, "Email doesn't match");
		Assert.equals(request.customerInfo.username, customerInfo.Username, "Username doesn't match");
		Assert.equals(request.customerInfo.customerPhone, customerInfo.CustomerPhone, "CustomerPhone doesn't match");
		Assert.equals(request.customerInfo.billingAddress.firstName, customerInfo.BillingAddress.Firstname, "BillingAddress.Firstname doesn't match");
		Assert.equals(request.customerInfo.billingAddress.lastName, customerInfo.BillingAddress.Lastname, "BillingAddress.Lastname doesn't match");
		Assert.equals(request.customerInfo.billingAddress.address, customerInfo.BillingAddress.Address, "BillingAddress.Address doesn't match");
		Assert.equals(request.customerInfo.billingAddress.city, customerInfo.BillingAddress.City, "BillingAddress.City doesn't match");
		Assert.equals(request.customerInfo.billingAddress.region, customerInfo.BillingAddress.Region, "BillingAddress.Region doesn't match");
		Assert.equals(request.customerInfo.billingAddress.postalCode, customerInfo.BillingAddress.PostalCode, "BillingAddress.PostalCode doesn't match");
		Assert.equals(request.customerInfo.billingAddress.country, customerInfo.BillingAddress.Country, "BillingAddress.Country doesn't match");
		Assert.equals(request.customerInfo.shippingAddress.firstName, customerInfo.ShippingAddress.Firstname, "ShippingAddress.Firstname doesn't match");
		Assert.equals(request.customerInfo.shippingAddress.lastName, customerInfo.ShippingAddress.Lastname, "ShippingAddress.Lastname doesn't match");
		Assert.equals(request.customerInfo.shippingAddress.address, customerInfo.ShippingAddress.Address, "ShippingAddress.Address doesn't match");
		Assert.equals(request.customerInfo.shippingAddress.city, customerInfo.ShippingAddress.City, "ShippingAddress.City doesn't match");
		Assert.equals(request.customerInfo.shippingAddress.region, customerInfo.ShippingAddress.Region, "ShippingAddress.Region doesn't match");
		Assert.equals(request.customerInfo.shippingAddress.postalCode, customerInfo.ShippingAddress.PostalCode, "ShippingAddress.PostalCode doesn't match");
		Assert.equals(request.customerInfo.shippingAddress.country, customerInfo.ShippingAddress.Country, "ShippingAddress.Country doesn't match");
	}
}



