load('tests/basetest.js');

var factory = new RhinoAltaPayFactory(new AltaPayFactory());

var mapi = factory.getMerchantApi('shop api', 'testpassword', 'https://testgateway.altapaysecure.com');

var request = factory.getCheckoutSessionRequest();
request.terminal = 'AltaPay Test Terminal';
request.shopOrderid = "checkout_session_" + makeid(16);
request.amount = '100';
request.currency = 'DKK';
request.type = AuthType.payment;
request.sessionId = "session-" + makeid(16);
request.addTerminal('AltaPay Test Terminal');

var response = mapi.checkoutSession(request);
if (response.success() == true) {
    console.log("CheckoutSessionExample: success - SessionId: " + response.getSessionId() + " Status: " + response.getSessionStatus());
}
else {
    console.log("CheckoutSessionExample: failed : " + response.getErrorMessage());
}

function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
