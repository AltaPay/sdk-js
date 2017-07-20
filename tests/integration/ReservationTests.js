
var factory;
var mapi;

function createRequest(amount) {

    var request = factory.getReservationRequest();

    request.terminal = 'AltaPay Soap Test Terminal';
    request.shopOrderid = 'ReservationTest_' + (new Date()).getTime();
    request.type = AuthType.paymentAndCapture;
    request.amount = amount;
    request.currency = 'DKK';
    request.pan = '4111000011110002';
    request.expiryMonth = 1;
    request.expiryYear = 2018;
    request.cvc = '123';

    return request;
}

function createRequestWithToken(amount, creditCardToken) {

    var request = factory.getReservationRequest();

    request.terminal = 'AltaPay Soap Test Terminal';
    request.shopOrderid = 'ReservationTestWithToken_' + (new Date()).getTime();
    request.type = AuthType.paymentAndCapture;
    request.amount = amount;
    request.currency = 'DKK';
    request.creditCardToken = creditCardToken;
    request.cvc = '123';

    return request;
}

var ReservationTests = {

    setup : function()
    {
        factory = new RhinoAltaPayFactory(new AltaPayFactory());

        mapi = factory.getMerchantApi('shop api', 'testpassword', 'http://gateway.dev.earth.pensio.com');

    },

    successfulResult : function()
    {
        var request = createRequest(123.15);

        var response = mapi.reservation(request);

        Assert.equals(true, response.success(), "Error: " + response.getErrorMessage());

        Assert.equals(request.terminal, response.getPayment(0).responseObject.Terminal, "Terminal doesn't match");
        Assert.equals(request.shopOrderid, response.getPayment(0).responseObject.ShopOrderId, "ShopOrderId doesn't match");
        Assert.equals(request.type, response.getPayment(0).responseObject.AuthType, "AuthType doesn't match");
        Assert.equals(request.amount, response.getPayment(0).getCapturedAmount(), "CapturedAmount doesn't match");
        Assert.equals(request.amount, response.getPayment(0).getReservedAmount(), "ReservedAmount doesn't match");
        Assert.equals('411100******0002', response.getPayment(0).getCreditCardMaskedPan(), "PAN doesn't match");
        Assert.equals(request.expiryMonth, response.getPayment(0).getCreditCardExpiryMonth(), "ExpiryMonth doesn't match");
        Assert.equals(request.expiryYear, response.getPayment(0).getCreditCardExpiryYear(), "ExpiryYear doesn't match");

        Assert.assertTrue(response.getPayment(0).getTransactionId() != null, "getTransactionId");
        Assert.equals('captured', response.getPayment(0).getTransactionStatus());

        Assert.assertTrue(response.getPayment(0).responseObject.CreditCardToken != null, "CreditCardToken");
    },

    failedResult : function()
    {
        var request = createRequest(5.66);

        var response = mapi.reservation(request);

        Assert.equals(false, response.success());
        Assert.equals("Card Declined", response.getCardHolderErrorMessage());

        Assert.equals(request.terminal, response.getPayment(0).responseObject.Terminal, "Terminal doesn't match");
        Assert.equals(request.shopOrderid, response.getPayment(0).responseObject.ShopOrderId, "ShopOrderId doesn't match");
        Assert.equals(request.type, response.getPayment(0).responseObject.AuthType, "AuthType doesn't match");
        Assert.equals(0, response.getPayment(0).getCapturedAmount(), "CapturedAmount doesn't match");
        Assert.equals(0, response.getPayment(0).getReservedAmount(), "ReservedAmount doesn't match");
        Assert.equals('411100******0002', response.getPayment(0).getCreditCardMaskedPan(), "PAN doesn't match");
        Assert.equals(request.expiryMonth, response.getPayment(0).getCreditCardExpiryMonth(), "ExpiryMonth doesn't match");
        Assert.equals(request.expiryYear, response.getPayment(0).getCreditCardExpiryYear(), "ExpiryYear doesn't match");
    },

    errorResult : function()
    {
        var request = createRequest(5.67);

        var response = mapi.reservation(request);

        Assert.equals(false, response.success());
        Assert.equals("Internal Error", response.getCardHolderErrorMessage());

        Assert.equals(request.terminal, response.getPayment(0).responseObject.Terminal, "Terminal doesn't match");
        Assert.equals(request.shopOrderid, response.getPayment(0).responseObject.ShopOrderId, "ShopOrderId doesn't match");
        Assert.equals(request.type, response.getPayment(0).responseObject.AuthType, "AuthType doesn't match");
        Assert.equals(0, response.getPayment(0).getCapturedAmount(), "CapturedAmount doesn't match");
        Assert.equals(0, response.getPayment(0).getReservedAmount(), "ReservedAmount doesn't match");
        Assert.equals('411100******0002', response.getPayment(0).getCreditCardMaskedPan(), "PAN doesn't match");
        Assert.equals(request.expiryMonth, response.getPayment(0).getCreditCardExpiryMonth(), "ExpiryMonth doesn't match");
        Assert.equals(request.expiryYear, response.getPayment(0).getCreditCardExpiryYear(), "ExpiryYear doesn't match");
    },

    successfulResult_usingToken : function()
    {
        var request = createRequest(123.15);
        var response = mapi.reservation(request);

        var request2 = createRequestWithToken(123.15, response.getPayment(0).responseObject.CreditCardToken);
        var response2 = mapi.reservation(request2);

        Assert.equals(true, response2.success(), "Error: " + response2.getErrorMessage());
    },

    successfulResult_alternativeSource : function()
    {
        var request = createRequest(123.15);

        request.paymentSource = PaymentSource.eCommerce;

        var response = mapi.reservation(request);

        Assert.equals(true, response.success(), "Error: " + response.getErrorMessage());
    },

    allParameters : function()
    {

        var request = createRequest(1.23);

        // TODO ADD ALL THE PARAMETERS
        
        // orderLine:
        var orderLine = factory.getOrderLine();
        orderLine.description = 'description';
        orderLine.itemId = '222';
        orderLine.quantity = '1';
        orderLine.taxPercent = '1.23';
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

        var response = mapi.reservation(request);

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
};



