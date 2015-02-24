
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

ResponseFactory.getPaymentRequestResponse = function (responseObject)
{
	return new PaymentRequestResponse(responseObject);
};
