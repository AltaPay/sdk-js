
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

    this.salesReconciliationIdentifier = '';
    this.salesInvoiceNumber = '';

    /**
     * Amount - not percent
     * @type {number}
     */
    this.salesTax = 0;

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
