
/**
 * Factory that provides Rhino context
 *
 * @param baseFactory {AltaPayFactory}
 * @extends {AltaPayFactory}
 * @constructor
 */
function RhinoAltaPayFactory(baseFactory) {
	ObjectHelper.extend(this, baseFactory);
}

/**
 * @returns {Http}
 */
RhinoAltaPayFactory.prototype.getHttp = function() {
	return new RhinoHttp();
};

/**
 * @returns {Xml}
 */
AltaPayFactory.prototype.getXml = function() {
	return new RhinoXml();
};

