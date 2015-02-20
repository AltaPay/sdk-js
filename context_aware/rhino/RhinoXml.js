
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

	var doc = builder.parse(new org.xml.sax.InputSource(new java.io.StringReader(xmlString)));

	var iterator = doc.createNodeIterator(doc.getDocumentElement(), org.w3c.dom.traversal.NodeFilter.SHOW_ELEMENT, null, true);

	return this.traverseXmlDom(doc.getDocumentElement());
};


RhinoXml.prototype.traverseXmlDom = function(element) {

	var childNodes = element.getChildNodes();
	var result = {};
//	console.log(element.getTagName()+ "("+childNodes.getLength()+")");

	if(element.getAttributes() != null)
	{
		var attributes = element.getAttributes();
		for(var a = 0;a < attributes.getLength();a++)
		{
			var attribute = attributes.item(a);
			result['@'+attribute.getName()] = attribute.getTextContent();
		}
	}

	for(var i = 0;i < childNodes.getLength();i++)
	{
		var childNode = childNodes.item(i);



		if(childNode.getNodeType() == 3)
		{
			return childNode.getTextContent();
		}
		else if(childNode.getNodeType() == 1)
		{
			if(result[childNode.getTagName()])
			{
				if(Object.prototype.toString.call( result[childNode.getTagName()] ) !== '[object Array]' )
				{
					var oldValue = result[childNode.getTagName()];
					result[childNode.getTagName()] = [oldValue];
				}

				result[childNode.getTagName()].push(this.traverseXmlDom(childNode));
			}
			else
			{
				result[childNode.getTagName()] = this.traverseXmlDom(childNode);
			}


		}
		else
		{
			throw "Unknown node type: "+childNode.getNodeType();
		}

	}
	return result;
}