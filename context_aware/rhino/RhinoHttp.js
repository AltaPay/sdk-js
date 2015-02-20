/**
 * @implements {Http}
 * @constructor
 */
function RhinoHttp() {
	this.xml = new RhinoXml();
}

/**
 * Do a get request
 * @param url
 * @param parameters {object}
 * @param headers {object}
 */
RhinoHttp.prototype.get = function(url, parameters, headers) {

};


/**
 * Do a post request
 * @param url
 * @param parameters {object}
 * @param headers {object}
 */
RhinoHttp.prototype.post = function(url, parameters, headers) {

};

/**
 * Do a login request
 * @param url
 * @param username
 * @param password
 * @returns {boolean}
 */
RhinoHttp.prototype.login = function(url, username, password) {
	var charset = "UTF-8";
	var authEncBytes = javax.xml.bind.DatatypeConverter.printBase64Binary(java.lang.String(username + ":" + password).getBytes());

	var connection = java.net.URL(url).openConnection();
	connection.setRequestProperty("Authorization", "Basic " + java.lang.String(authEncBytes));
	connection.setRequestProperty("Accept-Charset", charset);

	var xml = this.xml.deserialize(inputStreamToString(connection.getInputStream()));
	return 'OK' === xml.Body.Result;
}

/**
 * Read response input stream into a string
 * @param is
 * @returns {string}
 */
function inputStreamToString(is){
	var ch;
	var sb = java.lang.StringBuilder();
	var reader = java.io.InputStreamReader(is);

	while((ch = reader.read())!= -1)
	{
		sb.append(java.lang.Character(ch));
	}
	return sb.toString();
}
