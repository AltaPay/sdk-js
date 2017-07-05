/**
 * Created by emerson on 7/4/17.
 *
 * Klarna test script: capture and update an existing order.
 *
 * To run execute: java -jar tests/js.jar example/Example_Klarna_Capture_UpdateOrder.js
 *
 */

load('tests/basetest.js');

var factory = new RhinoAltaPayFactory(new AltaPayFactory());

var mapi = factory.getMerchantApi('shop api', 'testpassword', 'http://gateway.dev.earth.pensio.com');


// CAPTURE: ======================================================================

var paymentId = "3"; // PUT A PAYMENT ID FROM A PREVIOUSLY CREATED ORDER HERE

var request = factory.getCaptureRequest();

request.paymentId = paymentId;

var response = mapi.capture(request);

if (!response.success()) {
    throw new Error ("Error: " + response.getErrorMessage());
}


// UPDATE ORDER: ==================================================================

var ol1 = factory.getOrderLine();
ol1.description = "description 1";
ol1.itemId = "id 01";
ol1.quantity = -1;
ol1.unitPrice = 1.1;
ol1.goodsType = GoodsType.item;
request.addOrderLine(ol1);

var ol2 = factory.getOrderLine();
ol2.description = "new item";
ol2.itemId = "new id";
ol2.quantity = 1;
ol2.unitPrice = 1.1;
ol2.goodsType = GoodsType.item;
request.addOrderLine(ol2);

var uorequest = factory.getUpdateOrderRequest(paymentId, [ol1, ol2]);

response = mapi.updateOrder(uorequest);

if (!response.success()) {
    throw new Error ("Error: " + response.getErrorMessage());
}