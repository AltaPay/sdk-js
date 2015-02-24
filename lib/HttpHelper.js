
function HttpHelper()
{

}

HttpHelper.prototype.getHttpHash = function(hash, prepend)
{
	var result = {};
	for(var k in hash)
	{
		var newKey = prepend == null ? k : prepend+'['+k+']';

		if(typeof(hash[k]) == 'object')
		{
			result = this.mergeHash(result, this.getHttpHash(hash[k],newKey));
		}
		else
		{
			result[newKey] = hash[k];
		}
	}
	return result;
}

HttpHelper.prototype.mergeHash = function(hash1, hash2)
{
	for(var k in hash2)
	{
		hash1[k] = hash2[k];
	}
	return hash1;
}

HttpHelper.prototype.buildParameterString = function(hash)
{
	var parameters = [];
	for(var k in hash)
	{
		parameters.push(encodeURIComponent(k)+'='+encodeURIComponent(hash[k]));
	}
	return parameters.join('&');
}