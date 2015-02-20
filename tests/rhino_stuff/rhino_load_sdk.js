load('AltaPayFactory.js');


var libFiles = listFiles('lib/');

for (var i=0; i<libFiles.length; i++) {
    load(libFiles[i].getCanonicalFile());
}


var rhinoLibFiles = listFiles('context_aware/rhino/');

for (var i=0; i<rhinoLibFiles.length; i++) {
    load(rhinoLibFiles[i].getCanonicalFile());
}
