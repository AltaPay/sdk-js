load('tests/basetest.js');

var factory = new RhinoAltaPayFactory(new AltaPayFactory());

var mapi = factory.getMerchantApi('shop api', 'testpassword', 'https://testgateway.altapaysecure.com');

var request = factory.getPaymentRequest();
request.terminal = 'AltaPay Test Terminal';
request.shopOrderid = "JS_AUI_simple_create_payment_"+makeid(16);
request.amount = '700';
request.currency = 'DKK';
request.type = AuthType.subscription;
var agreementConfig = factory.getAgreementConfig();
agreementConfig.agreementType = AgreementType.unscheduled;
agreementConfig.agreementUnscheduledType = AgreementUnscheduledType.incremental;
request.agreementConfig = agreementConfig;
var response = mapi.createPaymentRequest(request);
if(response.success()==true){
    console.log("SimpleCreatePaymentRequestWithAgreementExample: success");
}
else {
    console.log("SimpleCreatePaymentRequestWithAgreementExample: failed : "+response.getErrorMessage());
}

function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

