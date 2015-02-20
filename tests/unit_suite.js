#!/usr/bin/env node

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

var testFile = null;
var testMethod = null;

var params = java.lang.System.getProperty("sun.java.command").split(" ");
if(params[2])
{
	testFile = params[2];
}

if(params[3])
{
	testMethod = params[3];
}


var testFiles = listFiles('tests/unit/');
console.log("Running tests:");
var errors = [];
for (var i=0; i<testFiles.length; i++) {
	load(testFiles[i].getCanonicalFile());

	var testObjectName = testFiles[i].getName().replace('.js','');

	if(testFile != null && testFile != testObjectName)
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
		if(testMethod != null && testMethod != test)
		{
			continue;
		}
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
		}
	}

	console.log("");

	if(errors.length > 0)
	{
		console.log("");
		console.log("Errors:");
		for(var i in errors)
		{
			console.log(errors[i]);
		}
	}
	console.log("");


}
