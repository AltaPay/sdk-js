
function AgreementConfig() {
    this.agreementId = null;
    this.agreementType = null;
    this.agreementUnscheduledType = null;
    this.agreementExpiry = null;
    this.agreementFrequency = null;
    this.agreementNextChargeDate = null;
    this.agreementAdminUrl = null;
    this.agreementRetentionPeriod = null;
}

AgreementConfig.prototype.toHash = function() {
    var result = {};

    result.id = this.agreementId;
    result.type = this.agreementType;
    result.unscheduled_type = this.agreementUnscheduledType;
    result.expiry = this.agreementExpiry;
    result.frequency = this.agreementFrequency;
    result.next_charge_date = this.agreementNextChargeDate;
    result.admin_url = this.agreementAdminUrl;
    result.retention_period = this.agreementRetentionPeriod;

    return result;
};
