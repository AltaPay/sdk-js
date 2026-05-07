var xml;

var CheckoutSessionResponseTests = {

	setup : function()
	{
		xml = new RhinoXml();
	},

	success : function()
	{
		var response = new CheckoutSessionResponse({
				Header:{
					ErrorCode:0,
					ErrorMessage:''
				},
				Body:{
					Session:{
						Id:'some-session-id',
						Status:'CREATED'
					}
				}
			});

		Assert.equals(true, response.success());
		Assert.equals('some-session-id', response.getSessionId());
		Assert.equals('CREATED', response.getSessionStatus());
	},

	getErrorMessage : function()
	{
		var response = new CheckoutSessionResponse({
			Header:{
				ErrorCode:1,
				ErrorMessage:'Some error message'
			}
		});

		Assert.equals(false, response.success());
		Assert.equals('Some error message', response.getErrorMessage());
	},
	
	nullSessionInfo : function()
	{
		var response = new CheckoutSessionResponse({
			Header:{
				ErrorCode:0,
				ErrorMessage:''
			},
			Body:{
			}
		});

		Assert.equals(null, response.getSessionId());
		Assert.equals(null, response.getSessionStatus());
	}
};
