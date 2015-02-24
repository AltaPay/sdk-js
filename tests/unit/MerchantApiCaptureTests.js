





var factory;
var logger;
var http;
var dateHelper;
var xml;
var responseFactory;
var request;

var api;


// See http://jsmockito.org/

var MerchantApiCaptureTests = {

	setup :function ()
	{
		factory = JsMockito.mock(AltaPayFactory);
		logger = JsMockito.mock(Logger);
		http = JsMockito.mock(Http);
		dateHelper = JsMockito.mock(DateHelper);
		xml = JsMockito.mock(Xml);
		request = JsMockito.mock(CaptureRequest);
		responseFactory = JsMockito.mock(ResponseFactory);
		api = new MerchantApi('username','password','url',factory, logger, http, dateHelper, xml,responseFactory);
	},

	callHttpWithCorrectParameters : function()
	{
		var theHash = {the:'hash'};
		JsMockito.when(http).post(JsHamcrest.Matchers.anything(),JsHamcrest.Matchers.anything()).thenReturn("Hat!");
		JsMockito.when(request).toHash().thenReturn(theHash);

		api.capture(request);

		JsMockito.verify(http).post('url/merchant/API/captureReservation', theHash);
	},

	deserializeResponseFromPost : function()
	{
		JsMockito.when(http).post(JsHamcrest.Matchers.anything(),JsHamcrest.Matchers.anything()).thenReturn("Hat!");

		api.capture(request);

		JsMockito.verify(xml).deserialize("Hat!");
	},

	getResponseFromFactory : function()
	{
		var response = {the:'response'};
		JsMockito.when(xml).deserialize(JsHamcrest.Matchers.anything()).thenReturn(response);

		api.capture(request);

		JsMockito.verify(responseFactory).getCaptureResponse(response);
	},

	returnResponseFromFactory : function()
	{
		var response = new CaptureResponse({});
		JsMockito.when(responseFactory).getCaptureResponse(JsHamcrest.Matchers.anything()).thenReturn(response);

		var actual = api.capture(request);

		Assert.equals(response,actual);
	}
};