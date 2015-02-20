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

for (var i=0; i<testFiles.length; i++) {
	load(testFiles[i].getCanonicalFile());
}
