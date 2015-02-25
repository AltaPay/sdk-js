/**
 *
 * @param paymentRequestConfig {PaymentRequestConfig}
 * @param paymentInfo {PaymentInfo}
 * @constructor
 */
function PaymentRequestBase(paymentRequestConfig, paymentInfo) {
    //
    // required
    //
    this.terminal = '';
    this.shopOrderid = '';
    this.amount = 0;
    this.currency = ''; // ISO ?? (3 chars or 3 digits)

    //
    // optional
    //
    this.language = null;

    /**
     * Dictionary with key-value pairs
     * @type {PaymentInfo}
     */
    this.paymentInfos = paymentInfo;
    this.authType = null; // see AuthType
    this.creditCardToken = null;
    this.cookie = null;
    this.requestConfig = paymentRequestConfig;

	ObjectHelper.extend(this, new BaseRequest());
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

/**
 * @param key {string}
 * @returns {string}
 */
PaymentRequestBase.prototype.transformHashKey = function(key) {
	if(key == 'paymentInfos')
	{
		return 'transaction_info';
	}
	if(key == 'requestConfig')
	{
		return 'config';
	}

	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}