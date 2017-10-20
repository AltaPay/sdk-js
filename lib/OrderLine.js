/**
 *
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function OrderLine(baseRequest) {
	this.description = '';
	this.itemId = '';
	this.quantity = 0;
	this.taxPercent = null;
	this.unitCode = null;
	this.unitPrice = 0;
	this.discountPercent = null;
	this.imageUrl = null;
	this.taxAmount = null;

	/**
	 * @see GoodsType
	 * @type {string}
	 */
	this.goodsType = GoodsType.item;
	ObjectHelper.extend(this, baseRequest);
}

/**
 * @param key {string}
 * @returns {string}
 */
OrderLine.prototype.transformHashKey = function(key) {
	if(key == 'discountPercent')
	{
		return 'discount';
	}

	return key;
}

