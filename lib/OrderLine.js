
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
