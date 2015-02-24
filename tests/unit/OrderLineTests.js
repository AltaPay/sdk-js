
var OrderLineTests = {

	toHash : function()
	{
		var line = new OrderLine();
		line.itemId = 'item id#';
		line.description = 'description';
		line.unitPrice = 34.54;
		line.quantity = 34;
		line.unitCode = 'kg';
		line.taxAmount = 34;
		line.discountPercent = 23;
		line.imageUrl = 'http://image.url';
		line.goodsType = 'item';

		var hash = line.toHash();

		Assert.equals('item id#',hash.itemId);
		Assert.equals('description',hash.description);
		Assert.equals('34.54',hash.unitPrice);
		Assert.equals('34',hash.quantity);
		Assert.equals('kg',hash.unitCode);
		Assert.equals('34',hash.taxAmount);
		Assert.equals('23',hash.discount);
		Assert.equals('http://image.url',hash.imageUrl);
		Assert.equals('item',hash.goodsType);
	}

};