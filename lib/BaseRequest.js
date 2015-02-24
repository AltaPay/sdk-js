
function BaseRequest()
{

}

BaseRequest.prototype.toHash = function()
{
	var result = {};
	for(var v in this)
	{
		if(Object.prototype.toString.call( this[v] ) === '[object function]' )
		{
			continue;
		}
		var overridden = this.perElementToHash(v,this[v]);
		if(overridden !== false)
		{
			result[this.transformHashKey(v)] = overridden;
		}
		else if(this[v] !== null)
		{
			result[this.transformHashKey(v)] = this[v].toString();
		}
	}
	return result;
}

BaseRequest.prototype.perElementToHash = function()
{
	return false;
}

BaseRequest.prototype.transformHashKey = function(key) {
	return key;
}