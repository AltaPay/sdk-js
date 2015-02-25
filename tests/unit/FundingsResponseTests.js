
var testFactory;
var merchantApi;

var FundingsResponseTests = {

	setup : function()
	{
		testFactory = new UnitTestAltaPayFactory();

		merchantApi = JsMockito.mock(MerchantApi);
	},

	parseCsv : function()
	{
		JsMockito.when(merchantApi).getFundingCsv(JsHamcrest.Matchers.anything()).thenReturn(""+
			'Date;Type;ID;"Reconciliation Identifier";Payment;Order;Terminal;Shop;"Transaction Currency";"Transaction Amount";"Exchange Rate";"Settlement Currency";"Settlement Amount";"Fixed Fee";"Fixed Fee VAT";"Rate Based Fee";"Rate Based Fee VAT"'+"\n" +
			'2010-12-24;fee;"Monthly fee";;;;;"AltaPay Functional Test Shop";EUR;0.00;;EUR;0.00;0.00;0.00;0.00;0.00'+"\n" +
			'2010-12-24;payment;FunctionalTestContractID-record1;my-reconciliation-identifier;1;fixture-shop-order-id;"AltaPay Test Terminal";"AltaPay Functional Test Shop";EUR;0.00;;EUR;0.00;0.00;0.00;0.00;0.00'+"\n"
		);

		var record = new FundingResponse({}, merchantApi);

		var records = record.getFundingRecords();

		Assert.equals(2, records.length);
		Assert.equals('fee', records[0].type, "record1 type was wrong");
		Assert.equals('Monthly fee', records[0].id, "record1 id was wrong");
		Assert.equals('2010-12-24', records[0].date, "record1 date was wrong");
		Assert.equals('AltaPay Functional Test Shop', records[0].shop, "record1 shop was wrong");
		Assert.equals('EUR', records[0].transactionCurrency, "record1 transaction currency was wrong");
		Assert.equals(0, records[0].transactionAmount, "record1 transaction amount was wrong");
		Assert.equals('EUR', records[0].settlementCurrency, "record1 settlement currency was wrong");
		Assert.equals(0, records[0].settlementAmount, "record1 settlement amount was wrong");
		Assert.equals(0, records[0].fixedFee, "record1 fixed fee was wrong");
		Assert.equals(0, records[0].fixedFeeVat, "record1 fixed fee vat was wrong");
		Assert.equals(0, records[0].rateBasedFee, "record1 rate based fee was wrong");
		Assert.equals(0, records[0].rateBasedFeeVat, "record1 rate based fee vat was wrong");

		Assert.equals('payment', records[1].type, "record2 type was wrong");
		Assert.equals('FunctionalTestContractID-record1', records[1].id, "record2 id was wrong");
		Assert.equals('2010-12-24', records[1].date, "record2 date was wrong");
		Assert.equals('1', records[1].payment, "record2 payment was wrong");
		Assert.equals('fixture-shop-order-id', records[1].order, "record2 order was wrong");
		Assert.equals('AltaPay Test Terminal', records[1].terminal, "record2 terminal was wrong");
		Assert.equals('AltaPay Functional Test Shop', records[1].shop, "record2 shop was wrong");
		Assert.equals('EUR', records[1].transactionCurrency, "record2 transaction currency was wrong");
		Assert.equals(0, records[1].transactionAmount, "record2 transaction amount was wrong");
		Assert.equals('EUR', records[1].settlementCurrency, "record2 settlement currency was wrong");
		Assert.equals(0, records[1].settlementAmount, "record2 settlement amount was wrong");
		Assert.equals(0, records[1].fixedFee, "record2 fixed fee was wrong");
		Assert.equals(0, records[1].fixedFeeVat, "record2 fixed fee vat was wrong");
		Assert.equals(0, records[1].rateBasedFee, "record2 rate based fee was wrong");
		Assert.equals(0, records[1].rateBasedFeeVat, "record2 rate based fee vat was wrong");
	}
};