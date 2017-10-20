
var factory;
var mapi;

function createRequest(amount) {

    var request = factory.getReservationRequest();

    request.terminal = 'AltaPay Soap Test Terminal';
    request.shopOrderid = 'ReservationTest_' + (new Date()).getTime();
    request.amount = amount;
    request.currency = 'DKK';
    request.pan = '4111000011110002';
    request.expiryMonth = 1;
    request.expiryYear = 2018;

    // optional:
    request.type = AuthType.paymentAndCapture;
    request.cvc = '123';

    return request;
}

function createRequestWithToken(amount, creditCardToken) {

    var request = factory.getReservationRequest();

    request.terminal = 'AltaPay Soap Test Terminal';
    request.shopOrderid = 'ReservationTestWithToken_' + (new Date()).getTime();
    request.amount = amount;
    request.currency = 'DKK';
    request.creditCardToken = creditCardToken;

    // optional:
    request.type = AuthType.paymentAndCapture;
    request.cvc = '123';

    return request;
}

var ReservationTests = {

    setup : function()
    {
        factory = new RhinoAltaPayFactory(new AltaPayFactory());

        mapi = factory.getMerchantApi('shop api', 'testpassword', 'https://vmedev.pensio.com');

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

        request.paymentSource = PaymentSource.mail_order;
        request.customerCreatedDate = '2018-11-01';
        request.fraudService = FraudService.test;
        request.surcharge = 2.5;
        request.shippingMethod = ShippingMethod.international;

        request.addPaymentInfo('info1', 'desc1');
        request.addPaymentInfo('info2', 'desc2');
        
        // orderLine:
        var orderLine = factory.getOrderLine();
        orderLine.description = 'description';
        orderLine.itemId = 'id1';
        orderLine.quantity = '1';
        orderLine.taxPercent = '1.23';
        orderLine.taxAmount = '5.88';
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
        request.customerInfo.birthdate = '2001-01-02';
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

        Assert.equals(true, response.success(), "Error: " + response.getErrorMessage());

        // ordinary parameters:
        Assert.equals(request.terminal,     response.getPayment(0).responseObject.Terminal,     "Terminal doesn't match");
        Assert.equals(request.shopOrderid,  response.getPayment(0).responseObject.ShopOrderId,  "ShopOrderId doesn't match");
        Assert.equals(request.type,         response.getPayment(0).responseObject.AuthType,     "AuthType doesn't match");
        Assert.equals(request.amount,       response.getPayment(0).getCapturedAmount(),         "CapturedAmount doesn't match");
        Assert.equals(request.amount,       response.getPayment(0).getReservedAmount(),         "ReservedAmount doesn't match");
        Assert.equals('411100******0002',   response.getPayment(0).getCreditCardMaskedPan(),    "PAN doesn't match");
        Assert.equals(request.expiryMonth,  response.getPayment(0).getCreditCardExpiryMonth(),  "ExpiryMonth doesn't match");
        Assert.equals(request.expiryYear,   response.getPayment(0).getCreditCardExpiryYear(),   "ExpiryYear doesn't match");

        Assert.equals('desc1', response.getPaymentInfo('info1'), "PaymentInfo[info1] doesn't match");
        Assert.equals('desc2', response.getPaymentInfo('info2'), "PaymentInfo[info2] doesn't match");

        // customer info:
        checkCustomerInfo (request.customerInfo, response.getPayment(0).responseObject.CustomerInfo);

    }
};


/**
 *
 * @param request {CustomerInfo}
 * @param response {object}
 */
function checkCustomerInfo (request, response) {

    Assert.equals(request.email,                      response.Email,                       "Email doesn't match");
    Assert.equals(request.username,                   response.Username,                    "Username doesn't match");
    Assert.equals(request.customerPhone,              response.CustomerPhone,               "CustomerPhone doesn't match");
    //Assert.equals(request.bankName,                   response.BankName,                    "BankName doesn't match");
    //Assert.equals(request.bankPhone,                  response.BankPhone,                   "BankPhone doesn't match");
    //Assert.equals(request.birthdate,                  response.BirthDate,                   "BirthDate doesn't match");

    Assert.equals(request.billingAddress.firstName,   response.BillingAddress.Firstname,    "BillingAddress.Firstname doesn't match");
    Assert.equals(request.billingAddress.lastName,    response.BillingAddress.Lastname,     "BillingAddress.Lastname doesn't match");
    Assert.equals(request.billingAddress.address,     response.BillingAddress.Address,      "BillingAddress.Address doesn't match");
    Assert.equals(request.billingAddress.city,        response.BillingAddress.City,         "BillingAddress.City doesn't match");
    Assert.equals(request.billingAddress.region,      response.BillingAddress.Region,       "BillingAddress.Region doesn't match");
    Assert.equals(request.billingAddress.postalCode,  response.BillingAddress.PostalCode,   "BillingAddress.PostalCode doesn't match");
    Assert.equals(request.billingAddress.country,     response.BillingAddress.Country,      "BillingAddress.Country doesn't match");
    Assert.equals(request.shippingAddress.firstName,  response.ShippingAddress.Firstname,   "ShippingAddress.Firstname doesn't match");
    Assert.equals(request.shippingAddress.lastName,   response.ShippingAddress.Lastname,    "ShippingAddress.Lastname doesn't match");
    Assert.equals(request.shippingAddress.address,    response.ShippingAddress.Address,     "ShippingAddress.Address doesn't match");
    Assert.equals(request.shippingAddress.city,       response.ShippingAddress.City,        "ShippingAddress.City doesn't match");
    Assert.equals(request.shippingAddress.region,     response.ShippingAddress.Region,      "ShippingAddress.Region doesn't match");
    Assert.equals(request.shippingAddress.postalCode, response.ShippingAddress.PostalCode,  "ShippingAddress.PostalCode doesn't match");
    Assert.equals(request.shippingAddress.country,    response.ShippingAddress.Country,     "ShippingAddress.Country doesn't match");
}