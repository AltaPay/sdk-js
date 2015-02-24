
var xml;

var RefundResponseTests = {
	setup : function()
	{
		xml = new RhinoXml();
	},

	getResultObject : function()
	{
		var responseObject = {Header:{},Body:{}};
		var refundResponse = new RefundResponse(responseObject);

		Assert.equals(responseObject, refundResponse.getResponseObject());
	},

	success : function()
	{
		var refundResponse = new RefundResponse(xml.deserialize("<?xml version=\"1.0\"?> <APIResponse version=\"20141202\"><Header><Date>2015-02-20T10:12:46+01:00</Date><Path>/</Path><ErrorCode>0</ErrorCode><ErrorMessage></ErrorMessage></Header><Body><Result>Success</Result><Transactions><Transaction><TransactionId>4753371</TransactionId><PaymentId>162f6d97-b2b0-4822-9a6e-fa6926fcad2d</PaymentId><AuthType>payment</AuthType><CardStatus>InvalidLuhn</CardStatus><CreditCardExpiry><Year>2018</Year><Month>05</Month></CreditCardExpiry><CreditCardToken>6b6a909b691e0d53926fd93893cbf273a047264a</CreditCardToken><CreditCardMaskedPan>456465*********1313</CreditCardMaskedPan><ThreeDSecureResult>Not_Attempted</ThreeDSecureResult><LiableForChargeback>Merchant</LiableForChargeback><CVVCheckResult>Not_Attempted</CVVCheckResult><BlacklistToken>f5e47cee0da623f79fca273a5be45cb8b936385f</BlacklistToken><ShopOrderId>12188989x61193587</ShopOrderId><Shop>DFDS</Shop><Terminal>DFDS Test Terminal</Terminal><TransactionStatus>preauth</TransactionStatus><MerchantCurrency>978</MerchantCurrency><MerchantCurrencyAlpha>EUR</MerchantCurrencyAlpha><CardHolderCurrency>978</CardHolderCurrency><CardHolderCurrencyAlpha>EUR</CardHolderCurrencyAlpha><ReservedAmount>321.12</ReservedAmount><CapturedAmount>0.00</CapturedAmount><RefundedAmount>0.00</RefundedAmount><RecurringDefaultAmount>0.00</RecurringDefaultAmount><CreatedDate>2015-02-20 10:12:45</CreatedDate><UpdatedDate>2015-02-20 10:12:46</UpdatedDate><PaymentNature>CreditCard</PaymentNature><PaymentSchemeName>Visa</PaymentSchemeName><PaymentNatureService name=\"SoapTestAcquirer\"><SupportsRefunds>true</SupportsRefunds><SupportsRelease>true</SupportsRelease><SupportsMultipleCaptures>true</SupportsMultipleCaptures><SupportsMultipleRefunds>true</SupportsMultipleRefunds></PaymentNatureService><ChargebackEvents/><PaymentInfos/><CustomerInfo><UserAgent>Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; InfoPath.2; .NET4.0C; .NET4.0E)</UserAgent><IpAddress>193.9.230.100</IpAddress><Email/><Username/><CustomerPhone></CustomerPhone><OrganisationNumber></OrganisationNumber><CountryOfOrigin><Country>AU</Country><Source>CardNumber</Source></CountryOfOrigin></CustomerInfo><ReconciliationIdentifiers/></Transaction></Transactions></Body></APIResponse>"));

		Assert.equals(true, refundResponse.success());
	},

	getReconciliationIdentifier_getsTheLastReconciliationIdentifier : function()
	{
		var refundResponse = new RefundResponse(xml.deserialize('<APIResponse version="20141202"><Header><Date>2015-02-24T12:09:42+01:00</Date><Path>API/captureReservation</Path><ErrorCode>0</ErrorCode><ErrorMessage/></Header><Body><Result>Success</Result><CaptureAmount>1</CaptureAmount><CaptureCurrency>978</CaptureCurrency><CaptureResult>Success</CaptureResult><Transactions><Transaction><TransactionId>2</TransactionId><PaymentId>125e6122-34c2-4a09-81f5-f75629f1d83e</PaymentId><AuthType>payment</AuthType><CardStatus>InvalidLuhn</CardStatus><CreditCardExpiry><Year>2015</Year><Month>02</Month></CreditCardExpiry><CreditCardToken>f7ffd797d0e7ec3cea99881e709052fe49714468</CreditCardToken><CreditCardMaskedPan>234234*******4234</CreditCardMaskedPan><ThreeDSecureResult>Not_Attempted</ThreeDSecureResult><LiableForChargeback>Merchant</LiableForChargeback><CVVCheckResult>Matched</CVVCheckResult><BlacklistToken>8815c21b6b524923d0352b9b218286f7491905fd</BlacklistToken><ShopOrderId>052c6bb1f62f448ebbff3da5de074333</ShopOrderId><Shop>AltaPay Functional Test Shop</Shop><Terminal>AltaPay Test Terminal</Terminal><TransactionStatus>captured</TransactionStatus><MerchantCurrency>978</MerchantCurrency><MerchantCurrencyAlpha>EUR</MerchantCurrencyAlpha><CardHolderCurrency>978</CardHolderCurrency><CardHolderCurrencyAlpha>EUR</CardHolderCurrencyAlpha><ReservedAmount>49.95</ReservedAmount><CapturedAmount>2.00</CapturedAmount><RefundedAmount>0.00</RefundedAmount><RecurringDefaultAmount>0.00</RecurringDefaultAmount><CreatedDate>2015-02-24 12:06:50</CreatedDate><UpdatedDate>2015-02-24 12:09:42</UpdatedDate><PaymentNature>CreditCard</PaymentNature><PaymentSchemeName>Unknown Card</PaymentSchemeName><PaymentNatureService name="TestAcquirer"><SupportsRefunds>true</SupportsRefunds><SupportsRelease>true</SupportsRelease><SupportsMultipleCaptures>true</SupportsMultipleCaptures><SupportsMultipleRefunds>true</SupportsMultipleRefunds></PaymentNatureService><FraudRiskScore>49</FraudRiskScore><FraudExplanation>For the test fraud service the risk score is always equal mod 101 of the created amount for the payment</FraudExplanation><FraudRecommendation>Deny</FraudRecommendation><ChargebackEvents/><PaymentInfos/><CustomerInfo><UserAgent>Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36</UserAgent><IpAddress>10.101.97.76</IpAddress><Email/><Username/><CustomerPhone/><OrganisationNumber/><CountryOfOrigin><Country/><Source>NotSet</Source></CountryOfOrigin></CustomerInfo><ReconciliationIdentifiers><ReconciliationIdentifier><Id>705e3fc6-99a0-4a07-9a0d-0b4b2b0ba811</Id><Amount currency="978">1</Amount><Type>captured</Type><Date>2015-02-24T12:07:32+01:00</Date></ReconciliationIdentifier><ReconciliationIdentifier><Id>6e7e0915-0d4c-460e-9ed1-02a1cbe3ca41</Id><Amount currency="978">1</Amount><Type>captured</Type><Date>2015-02-24T12:09:42+01:00</Date></ReconciliationIdentifier></ReconciliationIdentifiers></Transaction></Transactions></Body></APIResponse>'));

		Assert.equals('6e7e0915-0d4c-460e-9ed1-02a1cbe3ca41', refundResponse.getReconciliationIdentifier());
	},



	getReconciliationIdentifier_getsTheLastReconciliationIdentifier_whenThereIsOnlyOne : function()
	{
		var refundResponse = new RefundResponse(xml.deserialize('<APIResponse version="20141202"><Header><Date>2015-02-24T12:09:42+01:00</Date><Path>API/captureReservation</Path><ErrorCode>0</ErrorCode><ErrorMessage/></Header><Body><Result>Success</Result><CaptureAmount>1</CaptureAmount><CaptureCurrency>978</CaptureCurrency><CaptureResult>Success</CaptureResult><Transactions><Transaction><TransactionId>2</TransactionId><PaymentId>125e6122-34c2-4a09-81f5-f75629f1d83e</PaymentId><AuthType>payment</AuthType><CardStatus>InvalidLuhn</CardStatus><CreditCardExpiry><Year>2015</Year><Month>02</Month></CreditCardExpiry><CreditCardToken>f7ffd797d0e7ec3cea99881e709052fe49714468</CreditCardToken><CreditCardMaskedPan>234234*******4234</CreditCardMaskedPan><ThreeDSecureResult>Not_Attempted</ThreeDSecureResult><LiableForChargeback>Merchant</LiableForChargeback><CVVCheckResult>Matched</CVVCheckResult><BlacklistToken>8815c21b6b524923d0352b9b218286f7491905fd</BlacklistToken><ShopOrderId>052c6bb1f62f448ebbff3da5de074333</ShopOrderId><Shop>AltaPay Functional Test Shop</Shop><Terminal>AltaPay Test Terminal</Terminal><TransactionStatus>captured</TransactionStatus><MerchantCurrency>978</MerchantCurrency><MerchantCurrencyAlpha>EUR</MerchantCurrencyAlpha><CardHolderCurrency>978</CardHolderCurrency><CardHolderCurrencyAlpha>EUR</CardHolderCurrencyAlpha><ReservedAmount>49.95</ReservedAmount><CapturedAmount>2.00</CapturedAmount><RefundedAmount>0.00</RefundedAmount><RecurringDefaultAmount>0.00</RecurringDefaultAmount><CreatedDate>2015-02-24 12:06:50</CreatedDate><UpdatedDate>2015-02-24 12:09:42</UpdatedDate><PaymentNature>CreditCard</PaymentNature><PaymentSchemeName>Unknown Card</PaymentSchemeName><PaymentNatureService name="TestAcquirer"><SupportsRefunds>true</SupportsRefunds><SupportsRelease>true</SupportsRelease><SupportsMultipleCaptures>true</SupportsMultipleCaptures><SupportsMultipleRefunds>true</SupportsMultipleRefunds></PaymentNatureService><FraudRiskScore>49</FraudRiskScore><FraudExplanation>For the test fraud service the risk score is always equal mod 101 of the created amount for the payment</FraudExplanation><FraudRecommendation>Deny</FraudRecommendation><ChargebackEvents/><PaymentInfos/><CustomerInfo><UserAgent>Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36</UserAgent><IpAddress>10.101.97.76</IpAddress><Email/><Username/><CustomerPhone/><OrganisationNumber/><CountryOfOrigin><Country/><Source>NotSet</Source></CountryOfOrigin></CustomerInfo><ReconciliationIdentifiers><ReconciliationIdentifier><Id>705e3fc6-99a0-4a07-9a0d-0b4b2b0ba811</Id><Amount currency="978">1</Amount><Type>captured</Type><Date>2015-02-24T12:07:32+01:00</Date></ReconciliationIdentifier></ReconciliationIdentifiers></Transaction></Transactions></Body></APIResponse>'));

		Assert.equals('705e3fc6-99a0-4a07-9a0d-0b4b2b0ba811', refundResponse.getReconciliationIdentifier());
	},

	getReconciliationIdentifier_getsTheLastReconciliationIdentifier_with3Elements : function()
	{
		var refundResponse = new RefundResponse(
			{Body:{Transactions:{Transaction:{ReconciliationIdentifiers:{ReconciliationIdentifier:
				[
					{Id:'2'},
					{Id:'3'},
					{Id:'4'},
				]
			}}}}}
		);

		Assert.equals('4', refundResponse.getReconciliationIdentifier());
	},

};