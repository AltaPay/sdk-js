
function ResponseFactory()
{

}

ResponseFactory.prototype.getCaptureResponse = function(resultObject)
{
	return new CaptureResponse(resultObject);
}

ResponseFactory.getPaymentRequestResponse = function (resultObject)
{
	return new PaymentRequestResponse(resultObject);
};
