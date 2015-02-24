/**
 *
 * @implements {Http}
 * @constructor
 * @param xml {Xml}
 * @param httpHelper {HttpHelper}
 */
function RhinoHttp(xml, httpHelper) {
	this.xml = xml;
	this.httpHelper = httpHelper;
	this.charset = "UTF-8";
}

/**
 * Do a get request
 * @param url
 * @param parameters {object}
 * @param headers {object}
 * @return {string}
 */
RhinoHttp.prototype.get = function(url, parameters, headers) {
	var query = this.httpHelper.buildParameterString(this.httpHelper.getHttpHash(parameters));
	var connection = java.net.URL(url + "?" + query).openConnection();
	for (var key in headers)
	{
		connection.setRequestProperty(key, headers[key]);
	}
	return this.inputStreamToString(connection.getInputStream());
};


/**
 * Do a post request
 * @param url
 * @param parameters {object}
 * @param headers {object}
 * @return {string}
 */
RhinoHttp.prototype.post = function(url, parameters, headers) {

};

/**
 * Read response input stream into a string
 * @param is
 * @returns {string}
 * @private
 */
RhinoHttp.prototype.inputStreamToString = function(is){
	var ch;
	var sb = java.lang.StringBuilder();
	var reader = java.io.InputStreamReader(is);

	while((ch = reader.read())!= -1)
	{
		sb.append(java.lang.Character(ch));
	}
	return sb.toString();
}
