
/**
 * @implements {Xml}
 * @constructor
 */
function RhinoXml() {

}

/**
 * Build anonymous javascript object from xml
 * @param xmlString
 */
RhinoXml.prototype.deserialize = function(xmlString) {
	var builder = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder()

	builder.parse(new org.xml.sax.InputSource(new java.io.StringReader(xmlString)));
};
