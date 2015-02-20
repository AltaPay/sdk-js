
load('tests/basetest.js');

var test = new Test();
test.run('tests/unit/');

var outputDirectory = java.io.File("tests/out/");
if(!outputDirectory.exists())
{
	outputDirectory.mkdir();
}

var printWriter = java.io.PrintWriter("tests/out/unit_tests.xml");

printWriter.println(test.getJunitResult());

printWriter.close();