/**
 *
 * @param paymentRequestConfig {PaymentRequestConfig}
 * @constructor
 */
function PaymentRequestBase(paymentRequestConfig) {
    //
    // required
    //
    this.terminal = '';
    this.shopOrderId = '';
    this.amount = 0;
    this.currency = ''; // ISO ?? (3 chars or 3 digits)

    //
    // optional
    //
    this.language = '';

    /**
     * Dictionary with key-value pairs
     * @type {Object}
     */
    this.paymentInfos = [];
    this.authType = ''; // see AuthType
    this.creditCardToken = '';
    this.cookie = '';
    this.requestConfig = paymentRequestConfig;
}

/**
 * Add a payment info (or transaction info). This will be available
 * in all callbacks.
 * @param name {string}
 * @param value {string}
 */
PaymentRequestBase.prototype.addPaymentInfo = function(name, value) {
    this.paymentInfos[name] = value;
};
