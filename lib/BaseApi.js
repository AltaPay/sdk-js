
function BaseApi()
{

}

/**
 * @return {Object}
 * @private
 */
BaseApi.prototype.getHeaders = function() {
	return {'Authorization': "Basic " + this.base64.encode(this.username +':'+ this.password),'x-altapay-client-version':JssdkVersion.VERSION,'User-Agent':JssdkVersion.VERSION};
}
