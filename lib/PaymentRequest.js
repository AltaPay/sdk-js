
/**
 *
 * @param baseRequest {PaymentRequestBase}
 * @param customerInfo {CustomerInfo}
 * @constructor
 */
function PaymentRequest(baseRequest, customerInfo) {
    // extend the baseRequest
    for (var x in baseRequest)
    {
        this[x] = baseRequest[x];
    }

    this.salesReconciliationIdentifier = null;
    this.salesInvoiceNumber = null;

    /**
     * Amount - not percent
     * @type {number}
     */
    this.salesTax = null;

    /**
     * @type {CustomerInfo}
     */
    this.customerInfo = customerInfo;

    /**
     * The creation date of the customer in the shop system.
     * Fraud detection services can use this.
     * @type {Date}
     */
    this.customerCreatedDate = null;

    /**
     * @type {OrderLine[]}
     */
    this.orderLines = [];

    /**
     * @see ShippingType
     * @type {string}
     */
    this.shippingType = '';

    this.organisationNumber = '';

    /**
     * @see AccountOffer
     * @type {string}
     */
    this.accountOffer = null;
}

/**
 * @param orderLine {OrderLine}
 */
PaymentRequest.prototype.addOrderLine = function(orderLine) {
    this.orderLines.push(orderLine);
};

PaymentRequest.prototype.toHash = function () {

	var parameters = this.getBasicCreatePaymentRequestParameters();

	// mandatory arguments
	parameters.amount = this.amount; // TODO ensure formatting is correct
	parameters.shop_orderid = this.shop_orderid;

	// optional arguments
	parameters.sales_reconciliation_identifier = this.salesReconciliationIdentifier;
	parameters.sales_invoice_number = this.salesInvoiceNumber;
	parameters.sales_tax = this.salesTax;
	parameters.shipping_method = this.shippingType;

	if (this.customerCreatedDate != null) {
		parameters.customer_created_date = this.dateHelper.formatDate('Y-m-d', this.customerCreatedDate);
	}
	parameters.organisation_number = this.organisationNumber;
	parameters.account_offer = this.accountOffer;

	// customer info
	parameters.customer_info = this.customerInfo.toHash();

	// order lines
	parameters.orderLines = this.addOrderLines();

	return parameters;
};


/**
 * @return {Object}
 * @private
 */
PaymentRequest.prototype.getBasicCreatePaymentRequestParameters = function() {
	var parameters = {};

	// mandatory arguments
	parameters.terminal = this.terminal;
	parameters.shop_orderid = this.shopOrderId;
	parameters.currency = this.currency;

	// config
	parameters.config = this.requestConfig.toHash();

	// optional arguments
	parameters.language = this.language;
	parameters.transaction_info = this.paymentInfos;
	parameters.type = this.authType;
	parameters.ccToken = this.creditCardToken;
	parameters.cookie = this.cookie;

	return parameters;
};


/**
 * @param request {PaymentRequest}
 * @private
 */
PaymentRequest.prototype.addOrderLines = function() {
	var lines = [];
	var line;
	for (var lineNumber in this.orderLines) {
		line = this.orderLines[lineNumber];

		lines.push({
			itemId: line.itemId
			, quantity: line.quantity
			, taxPercent: line.taxPercent
			, unitCode: line.unitCode
			, unitPrice: line.unitPrice
			, description: line.description
			, discount: line.discountPercent
			, goodsType: line.goodsType
		});
	}

	return lines;
};
