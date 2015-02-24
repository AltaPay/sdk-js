
var xml;

var PaymentRequestResponseTests = {

	setup : function()
	{
		xml = new RhinoXml();
	},

	success : function()
	{
		var paymentRequestResponse = new PaymentRequestResponse({
				Header:{
					ErrorCode:0,
					ErrorMessage:''
				},
				Body:{
					Result:'Success'
				}
			});

		Assert.equals(true, paymentRequestResponse.success());
	},

	getErrorMessage : function()
	{
		var paymentRequestResponse = new PaymentRequestResponse({
			Header:{
				ErrorCode:1,
				ErrorMessage:'Some message'
			}
		});

		Assert.equals('Some message', paymentRequestResponse.getErrorMessage());
	},

	getUrl_ifNoError_returnUrl : function()
	{
		var paymentRequestResponse = new PaymentRequestResponse({
			Header:{
				ErrorCode:0,
				ErrorMessage:''
			},
			Body:{
				Result:'Success',
				Url:'Some url'
			}
		});

		Assert.equals('Some url', paymentRequestResponse.getUrl());
	},

	getUrl_ifError_returnNull : function()
	{
		var paymentRequestResponse = new PaymentRequestResponse({
			Header:{
				ErrorCode:1,
				ErrorMessage:'Some message'
			}
		});

		Assert.equals(null, paymentRequestResponse.getUrl());
	},

	getDynamicJavascriptUrl_ifNoError_returnDynamicJavascriptUrl : function()
	{
		var paymentRequestResponse = new PaymentRequestResponse({
			Header:{
				ErrorCode:0,
				ErrorMessage:''
			},
			Body:{
				Result:'Success',
				DynamicJavascriptUrl:'Some dynamicJavascriptUrl'
			}
		});

		Assert.equals('Some dynamicJavascriptUrl', paymentRequestResponse.getDynamicJavascriptUrl());
	},

	getDynamicJavascriptUrl_ifError_returnNull : function()
	{
		var paymentRequestResponse = new PaymentRequestResponse({
			Header:{
				ErrorCode:1,
				ErrorMessage:'Some message'
			}
		});

		Assert.equals(null, paymentRequestResponse.getDynamicJavascriptUrl());
	}

};