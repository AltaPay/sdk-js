/**
 * From http://www.mailsend-online.com/blog/directory-traversal-in-rhino-javascript.html
 */
// spanDir - a directory traversal function for
// Rhino JavaScript
// Copyright 2010 by James K. Lawless
// See MIT/X11 license at
// http://www.mailsend-online.com/wp/license.php

importPackage(java.io);

// spanDir() accepts two parameters
// The first is a string representing a directory path
// The second is a closure that accepts a parameter of type
// java.io.File
function listFiles(dir, recursive) {
    var files = [];
    recursive = recursive || true;

    var lst = new File(dir).listFiles();

    if (lst == null) {
        return files;
    }

    for (var i=0; i<lst.length; i++) {
        // If it's a directory, recursive call spanDir()
        // so that we end up doing a scan of
        // the directory tree
        if (lst[i].isDirectory() && recursive) {
            files = files.concat(listFiles(lst[i].getCanonicalFile()));
        }
        else {
            files.push(lst[i]);
        }
    }

    return files;
}
