load('tests/basetest.js');

var factory = new RhinoAltaPayFactory(new AltaPayFactory());
var mapi = factory.getMerchantApi('shop api', 'testpassword', 'https://testgateway.altapaysecure.com');

    var request = factory.getPaymentRequest();
    request.terminal = 'AltaPay Test Terminal';
    request.shopOrderid = "complex_create_payment_"+makeid(16);
    request.amount = '100';
    request.currency = 'DKK';
    request.type = AuthType.payment;
    createOrderLines(request);
    request.customerInfo = createCustomerInfo();
    var response = mapi.createPaymentRequest(request);
    if(response.success()==true){
        console.log("ComplexCreatePaymentRequestExample: success");
    }
    else {
        console.log("ComplexCreatePaymentRequestExample: failed : "+response.getErrorMessage());
    }


function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


function createOrderLines(request) {
    for(var i = 1; i <= 2; i++){
        var ol = factory.getOrderLine();
        ol.description = "OrderLine" + i;
        ol.itemId = "item" + i;
        ol.quantity = i;
        ol.unitPrice = 100;
        ol.goodsType = GoodsType.item;
        request.addOrderLine(ol);
    }
}

function createCustomerInfo() {
    var customerInfo = factory.getCustomerInfo();
    customerInfo.email = "a@a.a";
    customerInfo.username = "user1";
    customerInfo.customerPhone = "123456789";
    customerInfo.bankName = "Bank123";
    customerInfo.bankPhone = "987654321";
    customerInfo.billingAddress = createCustomerAddress("John","Wick","NY");
    customerInfo.shippingAddress = createCustomerAddress("Clark","Kent","LA");
    return customerInfo;
}

function createCustomerAddress(firstName, lastName, city) {
    var address = factory.getCustomerAddress();
    address.city = city;
    address.firstName = firstName;
    address.lastName = lastName;
    return address
}
