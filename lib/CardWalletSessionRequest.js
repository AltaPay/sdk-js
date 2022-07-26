/**
 * @constructor
 * @param terminal
 * @param validationUrl
 * @param domain
 */
function CardWalletSessionRequest(terminal, validationUrl, domain)
{
	this.terminal = terminal;
	this.validationUrl = validationUrl;
	this.domain = domain;

	ObjectHelper.extend(this, new BaseRequest());
}

/**
 *
 * @param key {string}
 * @returns {string}
 * @private
 */
CardWalletSessionRequest.prototype.transformHashKey = function(key) {
	if(key == 'validationUrl')
	{
		return 'validationUrl';
	}

	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}