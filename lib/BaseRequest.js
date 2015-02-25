
function BaseRequest()
{

}

BaseRequest.prototype.toHash = function()
{
	var result = {};
	for(var v in this)
	{
		if(typeof( this[v] ) === 'function' )
		{
			continue;
		}
		var overridden = this.perElementToHash(v,this[v]);
		if(overridden !== false)
		{
			ObjectHelper.extend(result, overridden);
		}
		else if(Object.prototype.toString.call( this[v] ) === '[object Array]')
		{
			result[this.transformHashKey(v)] = [];
			for(var k in this[v])
			{
				if(this[v][k].toHash)
				{
					result[this.transformHashKey(v)][k] = this[v][k].toString();
				}
				else
				{
					result[this.transformHashKey(v)][k] = this[v][k].toString();
				}
			}

			//result[this.transformHashKey(v)] = this[v].toHash();
		}
		else if(Object.prototype.toString.call( this[v] ) === '[object Object]' && this[v].toHash)
		{
			result[this.transformHashKey(v)] = this[v].toHash();
		}
		else if(this[v] !== null)
		{
			result[this.transformHashKey(v)] = this[v].toString();
		}
	}
	return result;
}

/**
 * @private
 * @returns {boolean|object}
 */
BaseRequest.prototype.perElementToHash = function()
{
	return false;
}

/**
 * @private
 * @param key {string}
 * @returns {string}
 */
BaseRequest.prototype.transformHashKey = function(key) {
	return key;
}