#!/usr/bin/env node

load('tests/rhino_stuff/rhino_listFiles.js');
load('tests/rhino_stuff/rhino_load_sdk.js');

var testFiles = listFiles('tests/integration/');

for (var i=0; i<testFiles.length; i++) {
    load(testFiles[i].getCanonicalFile());
}
