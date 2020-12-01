/**
 * Created by sergej on 2017-10-20.
 *
 * Test script for OrderLines with TaxPercent & Amount.
 *
 * To run execute: java -jar tests/js.jar example/Example_SimpleRequest_WithOrderLinesAndTax.js
 */

load('tests/basetest.js');

var factory = new RhinoAltaPayFactory(new AltaPayFactory());

var mapi = factory.getMerchantApi('shop api', 'testpassword', 'https://testgateway.altapaysecure.com');

var request = factory.getPaymentRequest();

request.terminal = 'AltaPay Test Terminal';
request.shopOrderid = 'Example_OrderLines_' + (new Date()).getMilliseconds();
request.amount = '1.21';
request.currency = 'DKK';
request.type = AuthType.payment;

var ol1 = factory.getOrderLine();
ol1.description = "description 1";
ol1.itemId = "id 01";
ol1.quantity = 1;
ol1.unitPrice = 1.1;
ol1.taxPercent = 10;
ol1.taxAmount = 11;
ol1.goodsType = GoodsType.item;
request.addOrderLine(ol1);

var response = mapi.createPaymentRequest(request);

if (!response.success()) {
    throw new Error ("Error: " + response.getErrorMessage());
}

// Access the url below and use the social security number 0801363945 in the page form to complete the Klarna order
console.log(response.getUrl());
