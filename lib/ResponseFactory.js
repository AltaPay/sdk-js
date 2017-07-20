
function ResponseFactory()
{

}

/**

 * @param responseObject
 * @returns {CaptureResponse}
 */
ResponseFactory.prototype.getCaptureResponse = function(responseObject)
{
	return new CaptureResponse(responseObject);
}

/**
 * @param responseObject
 * @returns {RefundResponse}
 */
ResponseFactory.prototype.getRefundResponse = function(responseObject)
{
	return new RefundResponse(responseObject);
}

/**
 * @param responseObject
 * @returns {ReleaseResponse}
 */
ResponseFactory.prototype.getReleaseResponse = function(responseObject)
{
	return new ReleaseResponse(responseObject);
}

/**
 * @param responseObject
 * @returns {ChargeResponse}
 */
ResponseFactory.prototype.getChargeResponse = function(responseObject)
{
	return new ChargeResponse(responseObject);
}

/**
 * @param responseObject
 * @returns {PaymentRequestResponse}
 */
ResponseFactory.prototype.getPaymentRequestResponse = function (responseObject)
{
	return new PaymentRequestResponse(responseObject);
};

/**
 * @param responseObject
 * @returns {UpdateOrderResponse}
 */
ResponseFactory.prototype.getUpdateOrderResponse = function (responseObject)
{
	return new UpdateOrderResponse(responseObject);
};


/**
 * @param responseObject
 * @returns {InvoiceReservationResponse}
 */
ResponseFactory.prototype.getInvoiceReservationResponse = function (responseObject)
{
	return new InvoiceReservationResponse(responseObject);
};

/**
 * @param responseObject
 * @returns {ReservationResponse}
 */
ResponseFactory.prototype.getReservationResponse = function (responseObject)
{
	return new ReservationResponse(responseObject);
};

/**
 * @param responseObject
 * @returns {InitiatePaymentResponse}
 */
ResponseFactory.prototype.getInitiatePaymentResponse = function(responseObject)
{
	return new InitiatePaymentResponse(responseObject);
}

/**
 * @param responseObject
 * @returns {CallbackResponse}
 */
ResponseFactory.prototype.getCallbackResponse = function(responseObject)
{
	return new CallbackResponse(responseObject);
}

/**
 * @param responseObject
 * @returns {PaymentsResponse}
 */
ResponseFactory.prototype.getPaymentsResponse = function(responseObject)
{
	return new PaymentsResponse(responseObject);
}

/**
 * @param responseObject {object}
 * @param merchantApi MerchantApi
 * @returns {FundingsResponse}
 */
ResponseFactory.prototype.getFundingsResponse = function(responseObject, merchantApi)
{
	return new FundingsResponse(responseObject, merchantApi, this);
}

/**
 * @param data {object}
 * @returns {FundingRecord}
 */
ResponseFactory.prototype.getFundingRecord = function(data)
{
	return new FundingRecord(data);
}

