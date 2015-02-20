#!/usr/bin/env node

load('tests/rhino_stuff/rhino_listFiles.js');
load('tests/rhino_stuff/rhino_load_sdk.js');

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



var testFiles = listFiles('tests/unit/');
console.log("Running tests:");
var errors = [];
for (var i=0; i<testFiles.length; i++) {
	load(testFiles[i].getCanonicalFile());

	var testObjectName = testFiles[i].getName().replace('.js','');
	console.log(testObjectName);

	eval.call(null,"var testObject = "+testObjectName);
	for(var test in testObject)
	{
		try
		{
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
