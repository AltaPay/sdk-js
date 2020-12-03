
load('tests/basetest.js');

var factory = new RhinoAltaPayFactory(new AltaPayFactory());

var mapi = factory.getMerchantApi('shop api', 'testpassword', 'https://testgateway.altapaysecure.com');

var reservationId = createCapturedReservation("complex_refund_");
var refundRequest = factory.getRefundRequest();
refundRequest.paymentId = reservationId;
refundRequest.amount = 20;
createOrderLines(refundRequest);
var response = mapi.refund(refundRequest);
if(response.success()==true){
    console.log("ComplexRefundExample: success");
}
else {
    console.log("ComplexRefundExample: failed : "+response.getErrorMessage());
}

function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function createReservation(prefix) {
    var request = factory.getReservationRequest();
    request.shopOrderid = prefix+makeid(16);
    request.terminal = 'AltaPay Test Terminal';
    request.amount = 100.01;
    request.currency = 'DKK';
    request.cardnum = "4111111111111111";
    request.emonth= "12";
    request.eyear = "2020";
    // optional:
    request.type = AuthType.payment;
    request.cvc = '123';
    var response = mapi.reservation(request);
    if (!response.success()) {
        throw new Error ("Error: " + response.getErrorMessage());
    }
    return response.getTransactionId();
}

function createCapturedReservation(prefix){
    var reservationId = createReservation(prefix);
    var request = factory.getCaptureRequest();
    request.paymentId = reservationId;
    var response = mapi.capture(request);
    if (!response.success()) {
        throw new Error ("Error: " + response.getErrorMessage());
    }
    return response.getTransactionId();
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