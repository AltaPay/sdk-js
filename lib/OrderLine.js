/**
 *
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function OrderLine(baseRequest) {
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

