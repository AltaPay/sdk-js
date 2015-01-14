
function PaymentRequest() {
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
    this.paymentInfos = [];
    this.authType = ''; // see AuthType
    this.creditCardToken = '';
    this.cookie = '';
    this.requestConfig = null;
}