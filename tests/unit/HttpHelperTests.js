
var httpHelper;


var HttpHelperTests = {

	setup : function()
	{
		httpHelper = new HttpHelper();
	},

	getHttpHash_simpleObject : function()
	{
		var actual = httpHelper.getHttpHash({element1:'value1',element2:'value2'});

		Assert.equals('value1', actual.element1);
		Assert.equals('value2', actual.element2);
	},

	getHttpHash_singleLevelRecursive : function()
	{
		var actual = httpHelper.getHttpHash({element1:{sub1:'value1',sub2:'value2'}});

		Assert.equals('value1', actual['element1[sub1]']);
		Assert.equals('value2', actual['element1[sub2]']);
	},

	getHttpHash_multiLevelRecursive : function()
	{
		var actual = httpHelper.getHttpHash({element1:{sub1:{subsub:'value1'},sub2:'value2'}});

		Assert.equals('value1', actual['element1[sub1][subsub]']);
		Assert.equals('value2', actual['element1[sub2]']);
	},

	getHttpHash_withArray : function()
	{
		var actual = httpHelper.getHttpHash({element1:{sub1:['value1','value2']}});

		Assert.equals('value1', actual['element1[sub1][0]']);
		Assert.equals('value2', actual['element1[sub1][1]']);
	},

	getHttpHash_withJavaString : function()
	{
		var actual = httpHelper.getHttpHash({element1:new java.lang.String('value1')});

		Assert.equals('value1', actual['element1']);
	},

	buildParameterString_simple : function()
	{
		var actual = httpHelper.buildParameterString({element1:'value1',element2:'value2'});

		Assert.equals('element1=value1&element2=value2', actual);
	},

	buildParameterString_urlEncodes : function()
	{
		var actual = httpHelper.buildParameterString({'"#%&/=?':'"#%&/=?','element2[hat]':'value2'});

		Assert.equals('%22%23%25%26%2F%3D%3F=%22%23%25%26%2F%3D%3F&element2%5Bhat%5D=value2', actual);
	}
};