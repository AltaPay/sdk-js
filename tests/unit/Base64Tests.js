
var Base64Tests = {
	encode_matchesEncodingFromJava : function()
	{
		var base64 = new Base64();
		var javascript = base64.encode("Hatten hopper over åen");
		var javaString = java.lang.String("Hatten hopper over åen");

		var javaBase64encoded = javax.xml.bind.DatatypeConverter.printBase64Binary(javaString.getBytes());

		Assert.equals(javascript, javaBase64encoded);
	},

	encode_matchesHardcodedBase64String : function()
	{
		var base64 = new Base64();
		var encoded = base64.encode("Muh the cat said, as it thought it was a cow");

		Assert.equals("TXVoIHRoZSBjYXQgc2FpZCwgYXMgaXQgdGhvdWdodCBpdCB3YXMgYSBjb3c=", encoded);
	}
};