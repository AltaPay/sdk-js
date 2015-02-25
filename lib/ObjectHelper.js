
var ObjectHelper = {
	/**
	 * Set values on object which doesnt already exist to values from withObject
	 *
	 * @param object {object}
	 * @param withObject {object}
	 */
	extend : function(object, withObject)
	{
		for (var x in withObject) {
			// only override the stuff that we have not implemented here
			if (!object[x]) {
				object[x] = withObject[x];
			}
		}
	}

};