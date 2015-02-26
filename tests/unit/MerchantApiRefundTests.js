
var factory;
var logger;
var http;
var dateHelper;
var xml;
var responseFactory;
var request;
var base64;
var testFactory;

var api;

var MerchantApiRefundTests = {

	setup :function ()
	{
		testFactory = new UnitTestAltaPayFactory();
		factory = JsMockito.mock(AltaPayFactory);
		logger = JsMockito.mock(Logger);
		http = JsMockito.mock(Http);
		dateHelper = JsMockito.mock(DateHelper);
		xml = JsMockito.mock(Xml);
		request = JsMockito.mock(testFactory.getRefundRequest());
		responseFactory = JsMockito.mock(ResponseFactory);
		base64 = new Base64();

		api = new MerchantApi('username','password','url',factory, logger, http, dateHelper, xml,responseFactory, base64, new BaseApi());
	},

	callHttpWithHeadersSet : function()
	{
		api.refund(request);

		JsMockito.verify(http).post(JsHamcrest.Matchers.anything(), JsHamcrest.Matchers.anything(), AltaPayMatchers.objectEquals({'Authorization':'Basic dXNlcm5hbWU6cGFzc3dvcmQ=','x-altapay-client-version':JssdkVersion.VERSION}));
	},

	callHttpWithCorrectParameters : function()
	{
		var theHash = {the:'hash'};
		JsMockito.when(http).post(JsHamcrest.Matchers.anything(),JsHamcrest.Matchers.anything()).thenReturn("Hat!");
		JsMockito.when(request).toHash().thenReturn(theHash);

		api.refund(request);

		JsMockito.verify(http).post('url/merchant/API/refundCapturedReservation', theHash, JsHamcrest.Matchers.anything());
	},

	deserializeResponseFromPost : function()
	{
		JsMockito.when(http).post(JsHamcrest.Matchers.anything(),JsHamcrest.Matchers.anything()).thenReturn("Hat!");

		api.refund(request);

		JsMockito.verify(xml).deserialize("Hat!");
	},

	getResponseFromFactory : function()
	{
		var response = {the:'response'};
		JsMockito.when(xml).deserialize(JsHamcrest.Matchers.anything()).thenReturn(response);

		api.refund(request);

		JsMockito.verify(responseFactory).getRefundResponse(response);
	},

	returnResponseFromFactory : function()
	{
		var response = new RefundResponse({});
		JsMockito.when(responseFactory).getRefundResponse(JsHamcrest.Matchers.anything()).thenReturn(response);

		var actual = api.refund(request);

		Assert.equals(response,actual);
	}

};