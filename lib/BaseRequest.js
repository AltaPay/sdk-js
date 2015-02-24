
function BaseRequest()
{

}

BaseRequest.prototype.toHash = function()
{
	var result = {};
	for(var v in this)
	{
		if(RefundRequest.prototype[v])
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