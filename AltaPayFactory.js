
function AltaPayFactory() {
}

/**
 * @returns {MerchantApi}
 */
AltaPayFactory.prototype.getMerchantApi = function(username, password, url) {
    return new MerchantApi(
          username
        , password
        , url
        , this
        , this.getLogger()
        , this.getHttp()
    );
};

/**
 * @returns {ProcessorApi}
 */
AltaPayFactory.prototype.getProcessorApi = function(username, password, url) {
    return new ProcessorApi(
          username
        , password
        , url
        , this
        , this.getLogger()
        , this.getHttp()
    );
};

/**
 * @returns {Logger}
 */
AltaPayFactory.prototype.getLogger = function() {
    return new Logger();
};

/**
 * @returns {Http}
 */
AltaPayFactory.prototype.getHttp = function() {
    return new Http();
};

/**
 * @returns {PaymentRequest}
 */
AltaPayFactory.prototype.getPaymentRequest = function() {
    return new PaymentRequest(this.getPaymentRequestConfig());
};

/**
 * @returns {PaymentRequestConfig}
 */
AltaPayFactory.prototype.getPaymentRequestConfig = function() {
    return new PaymentRequestConfig();
};