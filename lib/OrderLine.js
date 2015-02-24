
function OrderLine() {
    this.description = '';
    this.itemId = '';
    this.quantity = 0;
    this.taxPercent = 0;
    this.unitCode = '';
    this.unitPrice = 0;
    this.discountPercent = 0;

    /**
     * @see GoodsType
     * @type {string}
     */
    this.goodsType = '';
}


OrderLine.prototype.toHash = function() {
	var result = {};
	for(var v in this)
	{
		if(OrderLine.prototype[v])
		{
			continue;
		}
		if(this[v] !== null)
		{
			result[this.transformHashKey(v)] = this[v].toString();
		}
	}
	return result;
}

OrderLine.prototype.transformHashKey = function(key) {
	if(key == 'discountPercent')
	{
		return 'discount';
	}

	return key;
}