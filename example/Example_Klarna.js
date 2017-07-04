/**
 * Created by emerson on 7/4/17.
 *
 * Klarna test script.
 *
 * To run execute: java -jar tests/js.jar example/Example_Klarna.js
 */

load('tests/basetest.js');

var factory = new RhinoAltaPayFactory(new AltaPayFactory());

var mapi = factory.getMerchantApi('shop api', 'testpassword', 'http://gateway.dev.earth.pensio.com');

var address = factory.getCustomerAddress();
address.address = "Sæffleberggate 56,1 mf";
address.city = "Varde";
address.country = "DK";
address.firstname = "Testperson-dk";
address.lastname = "Approved";
address.region = "DK";
address.postalCode = "6800";

var customerInfo = factory.getCustomerInfo();
customerInfo.email = "myuser@mymail.com";
customerInfo.username = "myuser";
customerInfo.customerPhone = "20123456";
customerInfo.bankName = "My Bank";
customerInfo.bankPhone = "+45 12-34 5678";
customerInfo.billingAddress = address;
customerInfo.shippingAddress = address;

var request = factory.getPaymentRequest();

request.terminal = 'AltaPay Klarna DK';
request.shopOrderid = 'Example_Klarna_' + (new Date()).getMilliseconds();
request.amount = '5.5';
request.currency = 'DKK';
request.type = AuthType.payment;
request.customerInfo = customerInfo;

var ol1 = factory.getOrderLine();
ol1.description = "description 1";
ol1.itemId = "id 01";
ol1.quantity = 1;
ol1.unitPrice = 1.1;
ol1.goodsType = GoodsType.item;
request.addOrderLine(ol1);

var ol2 = factory.getOrderLine();
ol2.description = "description 2";
ol2.itemId = "id 02";
ol2.quantity = 2;
ol2.unitPrice = 2.2;
ol2.goodsType = GoodsType.item;
request.addOrderLine(ol2);

var response = mapi.createPaymentRequest(request);

Assert.equals(true, response.success(), "Error: " + response.getErrorMessage());

// Access the url below and use the social security number 0801363945 in the page form to complete the Klarna order
console.log(response.getUrl());
