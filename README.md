JS SDK
======

This is an SDK for AltaPay written in JavaScript. It is written in a way that makes it possible to use in whatever JavaScript context is necessary (Node, Rhino etc).


Running test
------------

We are using Rhino to run unit tests.

To run the tests... In this case integration tests

```
cd <clone>
./tasks/runIntegrationTests.sh
```



Using it
--------

The SDK has been written to be extensible. This has been achieved by using dependency injection centered around the `AltaPayFactory`.

Because the SDK itself is context agnostic, it is important that you use the appropriate factory. If you are running on 
Rhino, use `RhinoAltaPayFactory`. This will provide you with objects that works in a Rhino context.

```
// you use the factory to get object instances
// that have all their dependencies injected
var factory = new RhinoAltaPayFactory();

// the Merchant API is the second most important object
// since this handles the communication with the gateway
var mapi = factory.getMerchantApi('username', 'password', 'https://testgateway.altapaysecure.com');

// all the methods on the API are message based
// to create a new payment we need a PaymentRequest
var request = factory.getPaymentRequest();
request.terminal = 'Your Test Terminal';
request.shopOrderid = 'YourOrderId';
request.amount = '20.15';
request.currency = 'EUR';

// send the request and get the response
var response = mapi.createPaymentRequest(request);

if (response.success()) {
	// payment was created
	var paymentWindowUrl = response.getUrl();
}
else {
	// something went wrong
	// could be network issues or input issues
	throw response.getErrorMessage();
}
```

The tests (both unit and integration) are a good source for seeing how the SDK is used.

Enjoy :)

## Change Log

### 1.0.2

- Supports API changes from 20210324

### 1.0.1

- Add the change log file and utilize Git tags
- Add/fetch ParameterSource 

### 1.0.0

- First milestone