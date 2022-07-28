#!/usr/bin/env bash

java -jar tests/js.jar example/SimpleCreatePaymentRequestExample.js
java -jar tests/js.jar example/SimpleCreatePaymentRequestWithAgreementExample.js
java -jar tests/js.jar example/ComplexCreatePaymentRequestExample.js
java -jar tests/js.jar example/SimpleCaptureExample.js
java -jar tests/js.jar example/SimplePartialCaptureExample.js
java -jar tests/js.jar example/ComplexCaptureExample.js
java -jar tests/js.jar example/SimpleRefundExample.js
java -jar tests/js.jar example/SimplePartialRefundExample.js
java -jar tests/js.jar example/ComplexRefundExample.js
java -jar tests/js.jar example/SimpleReleaseExample.js

