
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

	return this.traverseXmlDom(doc.getDocumentElement());
};

RhinoXml.prototype.serialize = function(rootName,object) {
	var builder = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder()

	var doc = builder.newDocument();

	var element = doc.createElement(rootName);
	doc.appendChild(element);

	this.buildDom(doc, element, object);

	var source = new javax.xml.transform.dom.DOMSource(doc);
	var stringWriter = new java.io.StringWriter();
	var streamResult = new javax.xml.transform.stream.StreamResult(stringWriter);
	var transformerFactory = new javax.xml.transform.TransformerFactory.newInstance();
	var transformer = transformerFactory.newTransformer();
	transformer.transform(source, streamResult);
	return stringWriter.toString();
};

RhinoXml.prototype.buildDom = function(doc, element, object)
{
	if(Object.prototype.toString.call( object ) === '[object Array]' )
	{
		for(var i in object)
		{
			this.buildDom(doc, element, object[i]);
		}
	}
	else
	{
		for(var x in object)
		{
			if(x.substr(0,1) == '@')
			{
				element.setAttribute(x.substr(1),object[x]);
			}
			else
			{
				var e = doc.createElement(x);
				if(typeof(object[x]) == 'object')
				{
					this.buildDom(doc, e, object[x]);
				}
				else
				{
					e.setTextContent(object[x]);
				}
				element.appendChild(e);
			}
		}
	}
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