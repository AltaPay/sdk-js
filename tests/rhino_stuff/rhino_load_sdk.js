load('AltaPayFactory.js');


var libFiles = listFiles('lib/');

for (var i=0; i<libFiles.length; i++) {
    load(libFiles[i].getCanonicalFile());
}
