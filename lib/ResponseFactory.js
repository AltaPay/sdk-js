
function ResponseFactory()
{

}

ResponseFactory.prototype.getCaptureResponse = function(responseObject)
{
	return new CaptureResponse(responseObject);
}

ResponseFactory.prototype.getRefundResponse = function(responseObject)
{
	return new RefundResponse(responseObject);
}

ResponseFactory.prototype.getReleaseResponse = function(responseObject)
{
	return new ReleaseResponse(responseObject);
}

ResponseFactory.prototype.getPaymentRequestResponse = function (responseObject)
{
	return new PaymentRequestResponse(responseObject);
};


ResponseFactory.prototype.getInitiatePaymentResponse = function(responseObject)
{
	return new InitiatePaymentResponse(responseObject);
}