load('tests/basetest.js');

var factory = new RhinoAltaPayFactory(new AltaPayFactory());

var mapi = factory.getMerchantApi('shop api', 'testpassword', 'https://vmedev.pensio.com');

var request = factory.getPaymentRequest();
request.terminal = 'AltaPay Test Terminal';
request.shopOrderid = "simple_create_payment_"+makeid(16);
request.amount = '100';
request.currency = 'DKK';
request.type = AuthType.payment;
var response = mapi.createPaymentRequest(request);
if(response.success()==true){
    console.log("SimpleCreatePaymentRequestExample: success");
}
else {
    console.log("SimpleCreatePaymentRequestExample: failed : "+response.getErrorMessage());
}

function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

