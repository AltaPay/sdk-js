
var console = {

    log: function(msg) {
        java.lang.System.out.println(msg);
    },

	logChar: function(msg) {
		java.lang.System.out.print(msg);
	},

	logObject : function(object, indentLevel)
	{
		if(indentLevel == null)
		{
			indentLevel = 0;
		}
		console.log(console.repeat(indentLevel, "\t")+'{');
		for(var k in object)
		{
			var str = k+': ';
			if(typeof(object) === 'function')
			{
				console.log(console.repeat(indentLevel+1, "\t") + str + 'function');
			}
			else if(Object.prototype.toString.call( object[k] ) === '[object Object]')
			{
				console.log(console.repeat(indentLevel+1, "\t") + str);
				console.logObject(object[k], indentLevel+1);
			}
			else
			{
				console.log(console.repeat(indentLevel+1, "\t") + str + object[k]);
			}

		}
		console.log(console.repeat(indentLevel, "\t") + '}');
	},

	repeat : function(num, str)
	{
		return new Array( num + 1 ).join( str );
	}

};