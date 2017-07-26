var testFactory;

var api;


var MerchantApiCallbackResponseTests = {

	setup :function ()
	{
		testFactory = new UnitTestAltaPayFactory();
		api = testFactory.getMerchantApi('username','password','url');
	},

	parseXml : function()
	{
		var response = api.parseCallbackXml("<?xml version=\"1.0\"?> <APIResponse version=\"20141202\"><Header><Date>2015-02-20T10:12:46+01:00</Date><Path>/</Path><ErrorCode>0</ErrorCode><ErrorMessage></ErrorMessage></Header><Body><Result>Success</Result><Transactions><Transaction><TransactionId>4753371</TransactionId><PaymentId>162f6d97-b2b0-4822-9a6e-fa6926fcad2d</PaymentId><AuthType>payment</AuthType><CardStatus>InvalidLuhn</CardStatus><CreditCardExpiry><Year>2018</Year><Month>05</Month></CreditCardExpiry><CreditCardToken>6b6a909b691e0d53926fd93893cbf273a047264a</CreditCardToken><CreditCardMaskedPan>456465*********1313</CreditCardMaskedPan><ThreeDSecureResult>Not_Attempted</ThreeDSecureResult><LiableForChargeback>Merchant</LiableForChargeback><CVVCheckResult>Not_Attempted</CVVCheckResult><BlacklistToken>f5e47cee0da623f79fca273a5be45cb8b936385f</BlacklistToken><ShopOrderId>12188989x61193587</ShopOrderId><Shop>DFDS</Shop><Terminal>DFDS Test Terminal</Terminal><TransactionStatus>preauth</TransactionStatus><MerchantCurrency>978</MerchantCurrency><MerchantCurrencyAlpha>EUR</MerchantCurrencyAlpha><CardHolderCurrency>978</CardHolderCurrency><CardHolderCurrencyAlpha>EUR</CardHolderCurrencyAlpha><ReservedAmount>321.12</ReservedAmount><CapturedAmount>0.00</CapturedAmount><RefundedAmount>0.00</RefundedAmount><RecurringDefaultAmount>0.00</RecurringDefaultAmount><CreatedDate>2015-02-20 10:12:45</CreatedDate><UpdatedDate>2015-02-20 10:12:46</UpdatedDate><PaymentNature>CreditCard</PaymentNature><PaymentSchemeName>Visa</PaymentSchemeName><PaymentNatureService name=\"SoapTestAcquirer\"><SupportsRefunds>true</SupportsRefunds><SupportsRelease>true</SupportsRelease><SupportsMultipleCaptures>true</SupportsMultipleCaptures><SupportsMultipleRefunds>true</SupportsMultipleRefunds></PaymentNatureService><ChargebackEvents/><PaymentInfos/><CustomerInfo><UserAgent>Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; InfoPath.2; .NET4.0C; .NET4.0E)</UserAgent><IpAddress>193.9.230.100</IpAddress><Email/><Username/><CustomerPhone></CustomerPhone><OrganisationNumber></OrganisationNumber><CountryOfOrigin><Country>AU</Country><Source>CardNumber</Source></CountryOfOrigin></CustomerInfo><ReconciliationIdentifiers/></Transaction></Transactions></Body></APIResponse>");

		Assert.equals('162f6d97-b2b0-4822-9a6e-fa6926fcad2d',response.getPaymentId());
		Assert.equals(321.12,response.getReservedAmount());
		Assert.equals(0,response.getCapturedAmount());

	},

	ePaymentCancelled : function()
	{
		var response = api.parseCallbackXml('<?xml version="1.0"?><APIResponse version="20150526"><Header><Date>2015-09-07T09:31:44+02:00</Date><Path>API/ePaymentVerify?result=CANCEL&amp;payment_id=ae5e0de7-5238-4746-be1c-f3ef2b141a3a&amp;checksum=6c4eb3b36c95438ae09b519f2f458fc9&amp;token=EC-0DT17833PH498183L</Path><ErrorCode>0</ErrorCode><ErrorMessage/></Header><Body><Result>Cancelled</Result><Transactions><Transaction><TransactionId>25</TransactionId><PaymentId>ae5e0de7-5238-4746-be1c-f3ef2b141a3a</PaymentId><AuthType>payment</AuthType><CardStatus>NoCreditCard</CardStatus><CreditCardToken/><CreditCardMaskedPan/><ThreeDSecureResult>Not_Applicable</ThreeDSecureResult><LiableForChargeback>Merchant</LiableForChargeback><CVVCheckResult>Not_Applicable</CVVCheckResult><BlacklistToken/><ShopOrderId>payment-request-906354c2-c6b8-4cd4-9d8e-d6381ff66b28</ShopOrderId><Shop>AltaPay Shop Integration</Shop><Terminal>AltaPay Paypal Test Terminal</Terminal><TransactionStatus>epayment_cancelled</TransactionStatus><MerchantCurrency>840</MerchantCurrency><MerchantCurrencyAlpha>USD</MerchantCurrencyAlpha><CardHolderCurrency>840</CardHolderCurrency><CardHolderCurrencyAlpha>USD</CardHolderCurrencyAlpha><ReservedAmount>0.00</ReservedAmount><CapturedAmount>0.00</CapturedAmount><RefundedAmount>0.00</RefundedAmount><CreditedAmount>0.00</CreditedAmount><RecurringDefaultAmount>0.00</RecurringDefaultAmount><SurchargeAmount>0.00</SurchargeAmount><CreatedDate>2015-09-07 09:31:24</CreatedDate><UpdatedDate>2015-09-07 09:31:44</UpdatedDate><PaymentNature>Wallet</PaymentNature><PaymentSchemeName>PayPal</PaymentSchemeName><PaymentNatureService name="PaypalAcquirer"><SupportsRefunds>true</SupportsRefunds><SupportsRelease>true</SupportsRelease><SupportsMultipleCaptures>true</SupportsMultipleCaptures><SupportsMultipleRefunds>true</SupportsMultipleRefunds></PaymentNatureService><ChargebackEvents/><PaymentInfos/><CustomerInfo><UserAgent>Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36</UserAgent><IpAddress>127.0.0.1</IpAddress><Email/><Username/><CustomerPhone/><OrganisationNumber/><CountryOfOrigin><Country/><Source>NotSet</Source></CountryOfOrigin><RegisteredAddress><Firstname/><Lastname/><Address/><City/><Region/><Country/><PostalCode/></RegisteredAddress></CustomerInfo><ReconciliationIdentifiers/></Transaction></Transactions></Body></APIResponse>');

		Assert.equals(false, response.success());
		Assert.equals('epayment_cancelled', response.getPayment(0).getTransactionStatus());
		
	},

	readReasonCode : function()
	{
		var response = api.parseCallbackXml(readFile('./tests/xml/ReasonCode.xml'));
		Assert.equals('NONE', response.getReasonCode());

	},

	readPaymentId : function()
	{
		var response = api.parseCallbackXml(readFile('./tests/xml/ReasonCode.xml'));
		Assert.equals('17794956-9bb6-4854-9712-bce5931e6e3a', response.getPaymentId());

	},

	readCardHolderMessage : function()
	{
		var response = api.parseCallbackXml(readFile('./tests/xml/CardHolderMessageMustBeShownFalse.xml'));

		Assert.equals('Card Declined', response.getCardHolderErrorMessage());
		Assert.equals('false', response.getCardHolderMessageMustBeShown());

		response = api.parseCallbackXml(readFile('./tests/xml/CardHolderMessageMustBeShownTrue.xml'));

		Assert.equals('true', response.getCardHolderMessageMustBeShown());

	}
};
