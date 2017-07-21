/**
 * @param billingAddress {CustomerAddress}
 * @param shippingAddress {CustomerAddress}
 * @constructor
 */
function CustomerInfo(billingAddress, shippingAddress) {
    this.email = null;
    this.username = null;
    this.customerPhone = null;
    this.bankName = null;
    this.bankPhone = null;
    this.birthdate = null;

    /**
     * @type {CustomerAddress}
     */
    this.billingAddress = billingAddress;

    /**
     * @type {CustomerAddress}
     */
    this.shippingAddress = shippingAddress;
}

/**
 * @returns {Object}
 */
CustomerInfo.prototype.toHash = function() {
    var result = {};

    result.email = this.email;
    result.username = this.username;
    result.customer_phone = this.customerPhone;
    result.bank_name = this.bankName;
    result.bank_phone = this.bankPhone;
    result.birthdate = this.birthdate;

    result.billing_firstname = this.billingAddress.firstName;
    result.billing_lastname = this.billingAddress.lastName;
    result.billing_city = this.billingAddress.city;
    result.billing_region = this.billingAddress.region;
    result.billing_postal = this.billingAddress.postalCode;
    result.billing_country = this.billingAddress.country;
    result.billing_address = this.billingAddress.address;

    result.shipping_firstname = this.shippingAddress.firstName;
    result.shipping_lastname = this.shippingAddress.lastName;
    result.shipping_city = this.shippingAddress.city;
    result.shipping_region = this.shippingAddress.region;
    result.shipping_postal = this.shippingAddress.postalCode;
    result.shipping_country = this.shippingAddress.country;
    result.shipping_address = this.shippingAddress.address;

    return result;
};
