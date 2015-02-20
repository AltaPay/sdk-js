
var rhinoXml = new RhinoXml();


var anonObject = rhinoXml.deserialize("<simple><xml>With content</xml></simple>");

Assert.equals("With content",anonObject.xml);



anonObject = rhinoXml.deserialize("<?xml version=\"1.0\"?> <APIResponse version=\"20141202\"><Header><Date>2015-02-20T10:12:46+01:00</Date><Path>/</Path><ErrorCode>0</ErrorCode><ErrorMessage></ErrorMessage></Header><Body><Result>Success</Result><Transactions><Transaction><TransactionId>4753371</TransactionId><PaymentId>162f6d97-b2b0-4822-9a6e-fa6926fcad2d</PaymentId><AuthType>payment</AuthType><CardStatus>InvalidLuhn</CardStatus><CreditCardExpiry><Year>2018</Year><Month>05</Month></CreditCardExpiry><CreditCardToken>6b6a909b691e0d53926fd93893cbf273a047264a</CreditCardToken><CreditCardMaskedPan>456465*********1313</CreditCardMaskedPan><ThreeDSecureResult>Not_Attempted</ThreeDSecureResult><LiableForChargeback>Merchant</LiableForChargeback><CVVCheckResult>Not_Attempted</CVVCheckResult><BlacklistToken>f5e47cee0da623f79fca273a5be45cb8b936385f</BlacklistToken><ShopOrderId>12188989x61193587</ShopOrderId><Shop>DFDS</Shop><Terminal>DFDS Test Terminal</Terminal><TransactionStatus>preauth</TransactionStatus><MerchantCurrency>978</MerchantCurrency><MerchantCurrencyAlpha>EUR</MerchantCurrencyAlpha><CardHolderCurrency>978</CardHolderCurrency><CardHolderCurrencyAlpha>EUR</CardHolderCurrencyAlpha><ReservedAmount>321.12</ReservedAmount><CapturedAmount>0.00</CapturedAmount><RefundedAmount>0.00</RefundedAmount><RecurringDefaultAmount>0.00</RecurringDefaultAmount><CreatedDate>2015-02-20 10:12:45</CreatedDate><UpdatedDate>2015-02-20 10:12:46</UpdatedDate><PaymentNature>CreditCard</PaymentNature><PaymentSchemeName>Visa</PaymentSchemeName><PaymentNatureService name=\"SoapTestAcquirer\"><SupportsRefunds>true</SupportsRefunds><SupportsRelease>true</SupportsRelease><SupportsMultipleCaptures>true</SupportsMultipleCaptures><SupportsMultipleRefunds>true</SupportsMultipleRefunds></PaymentNatureService><ChargebackEvents/><PaymentInfos/><CustomerInfo><UserAgent>Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; InfoPath.2; .NET4.0C; .NET4.0E)</UserAgent><IpAddress>193.9.230.100</IpAddress><Email/><Username/><CustomerPhone></CustomerPhone><OrganisationNumber></OrganisationNumber><CountryOfOrigin><Country>AU</Country><Source>CardNumber</Source></CountryOfOrigin></CustomerInfo><ReconciliationIdentifiers/></Transaction></Transactions></Body></APIResponse>");

Assert.equals("20141202",anonObject['@version']);
Assert.equals("2015-02-20T10:12:46+01:00",anonObject.Header.Date);

