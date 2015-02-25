
function PaymentRequestConfig() {
    this.callbackForm = null;
    this.callbackOk = null;
    this.callbackFail = null;
    this.callbackRedirect = null;
    this.callbackOpen = null;
    this.callbackNotification = null;

    /**
     * By settings this, a check will be made at the last possible time before taking the payment. This is
     * used to verify that stock, discounts, etc. are still valid for the order/shopping basket. This callback
     * will be done in the same way as other callbacks, but you can prepend GET parameters to the URL if you
     * need anything in particular which is not part of the normal POST parameters.
     *
     * To allow the payment you must return an HTML/TEXT response with the value "OKAY". Anything else will be
     * assumed to be a sign that we should abort/decline the payment and will be placed as the error message.
     * An example could be "Some of the items in the basked are out of stock".
     *
     * If your server responds with any other http response code than 200, the payment will fail with an error.
     *
     * To ensure consistence we will strip HTML/XML tags, and we will only allow the first 255 characters to
     * become the error message when the callback returns something different than "OKAY"
     */
    this.callbackVerifyOrder = null;

    /**
     * @see FraudService
     * @type {string}
     */
    this.fraudService = null;
}

PaymentRequestConfig.prototype.toHash = function() {
    var result = {};

    result.callback_form = this.callbackForm;
    result.callback_ok = this.callbackOk;
    result.callback_fail = this.callbackFail;
    result.callback_redirect = this.callbackRedirect;
    result.callback_open = this.callbackOpen;
    result.callback_notification = this.callbackNotification;
    result.callback_verify_order = this.callbackVerifyOrder;
    result.fraud_service = this.fraudService;

    return result;
};
