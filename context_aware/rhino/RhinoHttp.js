/**
 * @implements {Http}
 * @constructor
 */
function RhinoHttp() {
	this.xml = new RhinoXml();
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
	var query = this.buildParameterString(parameters);

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

/**
 *
 * @param params {object}
 * @returns {string}
 * @private
 */
RhinoHttp.prototype.buildParameterString = function(params)
{
	var str = '';
	var first = true;
	for (var p in params)
	{
		var tmpStr = '';
		if ('object' === typeof params[p])
		{
			tmpStr += this.getParameterListString(p, params[p]);
		}
		else if (null !== params[p] && '' !== params[p])
		{
			tmpStr += p + '=' + this.urlEncode(params[p]);
		}

		if (tmpStr != '')
		{
			if (first)
			{
				first = false;
				str += tmpStr;
			}
			else
			{
				str += '&' + tmpStr;
			}
		}
	}
	return str;
}

/**
 *
 * @param p
 * @param params {object}
 * @returns {string}
 * @private
 */
RhinoHttp.prototype.getParameterListString = function(p, params)
{
	var str = '';
	var first = true;
	for (var k in params)
	{
		var tmpStr = '';
		if (null !== params[p] && undefined !== params[p])
		{
			tmpStr += p + '[' + k + ']=' + this.urlEncode(params[p]);
		}

		if (tmpStr != '')
		{
			if (first)
			{
				first = false;
				str += tmpStr;
			}
			else
			{
				str += '&' + tmpStr;
			}
		}
	}
	return str;
}

/**
 *
 * @param value
 * @returns {string}
 * @private
 */
RhinoHttp.prototype.urlEncode = function(value)
{
	return java.net.URLEncoder.encode(value, this.charset)
}