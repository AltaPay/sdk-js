
function HttpHelper()
{

}

/**
 *
 * @param hash {string}
 * @param prefix {string}
 * @returns {object}
 */
HttpHelper.prototype.getHttpHash = function(hash, prefix)
{
	var result = {};
	for(var k in hash)
	{
		var newKey = prefix == null ? k : prefix+'['+k+']';

		if(typeof(hash[k]) == 'object' && (hash[k] == null || !hash[k].getClass))
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

/**
 *
 * @param hash1 {object}
 * @param hash2 {object}
 * @returns {object}
 * @private
 */
HttpHelper.prototype.mergeHash = function(hash1, hash2)
{
	for(var k in hash2)
	{
		hash1[k] = hash2[k];
	}
	return hash1;
}

/**
 *
 * @param hash {object}
 * @returns {string}
 */
HttpHelper.prototype.buildParameterString = function(hash)
{
	var parameters = [];
	for(var k in hash)
	{
		parameters.push(encodeURIComponent(k)+'='+encodeURIComponent(hash[k]));
	}
	return parameters.join('&');
}