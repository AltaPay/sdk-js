#!/usr/bin/env bash

java --add-opens java.xml/com.sun.org.apache.xalan.internal.xsltc.trax=ALL-UNNAMED --add-opens java.base/sun.net.www.protocol.https=ALL-UNNAMED --add-opens java.xml/com.sun.org.apache.xerces.internal.jaxp=ALL-UNNAMED --add-opens java.xml/com.sun.org.apache.xerces.internal.dom=ALL-UNNAMED -jar tests/js.jar tests/integration_suite.js
