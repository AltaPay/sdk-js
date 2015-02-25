
function BaseApi()
{

}

/**
 * @return {Object}
 * @private
 */
BaseApi.prototype.getAuthorizationHeader = function() {
	return {'Authorization': "Basic " + this.base64.encode(this.username +':'+ this.password)};
}
