

load('tests/rhino_stuff/rhino_listFiles.js');
load('tests/rhino_stuff/rhino_load_sdk.js');
load('tests/jshamcrest.js');
load('tests/jsmockito-1.0.4.js');

var Assert = {
	equals : function(expected, actual, message)
	{
		if(message == null)
		{
			message = "'"+expected+"' was unexpectedly different from: '"+actual+"'";
		}
		if(expected != actual)
		{
			throw message;
		}
	}
};

var AltaPayMatchers = {

	objectEquals : function(expected)
	{
		return new JsHamcrest.SimpleMatcher({
			matches: function(actual) {
				return JsHamcrest.areMapsEquivalent(expected, actual);
			},

			describeTo: function(description) {
				description.append('matches map');
			}
		});
	}
};

function Test() {

	this.testFile = null;
	this.testMethod = null;
	this.junit = [];


	var params = java.lang.System.getProperty("sun.java.command").split(" ");

	if(params[2] && (params[2].trim().length() > 0))
	{
		this.testFile = this.baseName(params[2]);
	}

	if(params[3] && params[3].trim().length() > 0)
	{
		this.testMethod = params[3];
	}

}

Test.prototype.baseName = function (str)
{
	var base = new String(str).substring(str.lastIndexOf('/') + 1);
	if(base.lastIndexOf(".") != -1)
		base = base.substring(0, base.lastIndexOf("."));
	return base;
};

Test.prototype.run = function(fromDir)
{
	var testFiles = listFiles(fromDir);
	console.log("Running tests:");
	var errors = [];
	for (var i=0; i<testFiles.length; i++) {
		load(testFiles[i].getCanonicalFile());

		var testObjectName = testFiles[i].getName().replace('.js','');

		if(this.testFile != null && this.testFile != testObjectName)
		{
			continue;
		}

		console.log(testObjectName);

		eval.call(null,"var testObject = "+testObjectName);
		for(var test in testObject)
		{
			if(test == 'setup')
			{
				continue;
			}
			if(this.testMethod != null && this.testMethod != test)
			{
				continue;
			}
			var junitTest = {'@classname':testObjectName,'@name':test};
			try
			{
				if(testObject['setup'])
				{
					testObject.setup();
				}
				testObject[test]();
				console.logChar('.');
			}
			catch(e)
			{

				errors.push(testObjectName+"."+test+": "+e);

				console.logChar('e');
				junitTest.error = {'@message':e, '@type':'error'};

			}
			this.junit.push({'testcase':junitTest});
		}



		console.log("");
	}




	if(errors.length > 0)
	{
		console.log("");
		console.log("Errors:");
		for(var errorsIndex in errors)
		{
			console.log(errors[errorsIndex]);
		}
	}
	console.log("");

};

Test.prototype.getJunitResult = function()
{
	var xml = new RhinoXml();
	return xml.serialize('testsuite',this.junit);
}








