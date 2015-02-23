
/**
 * Factory that provides Rhino context
 *
 * @param baseFactory {AltaPayFactory}
 * @extends {AltaPayFactory}
 * @constructor
 */
function RhinoAltaPayFactory(baseFactory) {
    // extend the base factory
    for (var x in baseFactory) {
        // only override the stuff that we have not implemented here
        if (!this[x]) {
            this[x] = baseFactory[x];
        }
    }
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

