
var ChargeResponseTests = {

	getPayment_singlePayment : function()
	{
		var response = new ChargeResponse({Body:{Transactions:{Transaction:{PaymentId:'12345'}}}});

		Assert.equals('12345', response.getPayment(0).getPaymentId());
	},

	getPayment_multiplePayments : function()
	{
		var response = new ChargeResponse({Body:{Transactions:{Transaction:[{PaymentId:'1'},{PaymentId:'2'}]}}});

		Assert.equals('1', response.getPayment(0).getPaymentId());
		Assert.equals('2', response.getPayment(1).getPaymentId());
	},

	getPayment_chargeSpecificPayments : function()
	{
		var response = new ChargeResponse({Body:{Transactions:{Transaction:[{PaymentId:'1'},{PaymentId:'2'}]}}});

		Assert.equals('1', response.getSubscriptionPayment().getPaymentId());
		Assert.equals('2', response.getChargePayment().getPaymentId());
	}

};