
function AltaPayFactory() {

}

AltaPayFactory.prototype.getMerchantApi = function() {
    return new MerchantApi(this, this.getLogger(), this.getHttp());
};

AltaPayFactory.prototype.getLogger = function() {
    return new Logger();
};

AltaPayFactory.prototype.getHttp = function() {
    return new Http();
};
