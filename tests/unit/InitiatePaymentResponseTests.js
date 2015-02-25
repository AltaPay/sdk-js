
var xml;

var InitiatePaymentResponseTests = {

	setup : function()
	{
		xml = new RhinoXml();
	},

	getPaymentInfo_fromRealXml : function()
	{
		var response = new InitiatePaymentResponse(xml.deserialize('<?xml version="1.0"?> <APIResponse version="20141202"><Header><Date>2015-02-25T10:21:56+01:00</Date><Path>/</Path><ErrorCode>0</ErrorCode><ErrorMessage/></Header><Body><Result>Success</Result><Transactions><Transaction><TransactionId>16</TransactionId><PaymentId>5fe27402-7749-4bb4-8a6d-433a63b9653f</PaymentId><AuthType>payment</AuthType><CardStatus>InvalidLuhn</CardStatus><CreditCardExpiry><Year>2020</Year><Month>11</Month></CreditCardExpiry><CreditCardToken>e3295c2ac4318faf8b893623973d0b7ba982021e</CreditCardToken><CreditCardMaskedPan>456123******4561</CreditCardMaskedPan><ThreeDSecureResult>Not_Attempted</ThreeDSecureResult><LiableForChargeback>Merchant</LiableForChargeback><CVVCheckResult>Matched</CVVCheckResult><BlacklistToken>ccbff53ad88cdc4b14c89aa667d57377201e8c25</BlacklistToken><ShopOrderId>InitiatePayment_1424856116034</ShopOrderId><Shop>AltaPay Functional Test Shop</Shop><Terminal>AltaPay Test Terminal</Terminal><TransactionStatus>preauth</TransactionStatus><MerchantCurrency>978</MerchantCurrency><MerchantCurrencyAlpha>EUR</MerchantCurrencyAlpha><CardHolderCurrency>978</CardHolderCurrency><CardHolderCurrencyAlpha>EUR</CardHolderCurrencyAlpha><ReservedAmount>30.30</ReservedAmount><CapturedAmount>0.00</CapturedAmount><RefundedAmount>0.00</RefundedAmount><RecurringDefaultAmount>0.00</RecurringDefaultAmount><CreatedDate>2015-02-25 10:21:56</CreatedDate><UpdatedDate>2015-02-25 10:21:56</UpdatedDate><PaymentNature>CreditCard</PaymentNature><PaymentSchemeName>Visa</PaymentSchemeName><PaymentNatureService name="TestAcquirer"><SupportsRefunds>true</SupportsRefunds><SupportsRelease>true</SupportsRelease><SupportsMultipleCaptures>true</SupportsMultipleCaptures><SupportsMultipleRefunds>true</SupportsMultipleRefunds></PaymentNatureService><FraudRiskScore>30</FraudRiskScore><FraudExplanation>For the test fraud service the risk score is always equal mod 101 of the created amount for the payment</FraudExplanation><FraudRecommendation>Deny</FraudRecommendation><ChargebackEvents/><PaymentInfos><PaymentInfo name="wah_wah"><![CDATA[hat]]></PaymentInfo><PaymentInfo name="another"><![CDATA[payment info]]></PaymentInfo></PaymentInfos><CustomerInfo><UserAgent/><IpAddress/><Email/><Username/><CustomerPhone/><OrganisationNumber/><CountryOfOrigin><Country>FR</Country><Source>CardNumber</Source></CountryOfOrigin></CustomerInfo><ReconciliationIdentifiers/></Transaction></Transactions></Body></APIResponse>'));

		Assert.equals('payment info',response.getPaymentInfo('another'));
		Assert.equals('hat',response.getPaymentInfo('wah_wah'));
	},

	getFraudRecommendation_accept : function()
	{
		var response = new InitiatePaymentResponse({Body:{Transactions:{Transaction:{FraudRecommendation:'Accept'}}}});

		Assert.equals(FraudRecommendation.Accept,response.getFraudRecommendation());
	},

	getFraudRecommendation_challenge : function()
	{
		var response = new InitiatePaymentResponse({Body:{Transactions:{Transaction:{FraudRecommendation:'Challenge'}}}});

		Assert.equals(FraudRecommendation.Challenge,response.getFraudRecommendation());
	},

	getFraudRecommendation_doesntExist : function()
	{
		var response = new InitiatePaymentResponse({Body:{Transactions:{Transaction:{}}}});

		Assert.equals(FraudRecommendation.Unknown,response.getFraudRecommendation());
	},

	getFraudRecommendation_paymentDoesntExist : function()
	{
		var response = new InitiatePaymentResponse({Header:{}, Body:{}});

		Assert.equals(FraudRecommendation.Unknown,response.getFraudRecommendation());
	},

	getFraudRecommendation_bodyDoesntExist : function()
	{
		var response = new InitiatePaymentResponse({Header:{}});

		Assert.equals(FraudRecommendation.Unknown,response.getFraudRecommendation());
	}

}