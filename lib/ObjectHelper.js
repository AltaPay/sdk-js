
var ObjectHelper = {
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