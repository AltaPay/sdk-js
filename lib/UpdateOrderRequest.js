/**
 * @param paymentId {string}
 * @param orderLines {object}
 * @constructor
 */
function UpdateOrderRequest(paymentId, orderLines)
{
	if (orderLines.length != 2)
	{
		throw new Error("orderLines must contain exactly two elements");
	}

	this.paymentId = paymentId;
	this.orderLines = orderLines;

	//ObjectHelper.extend(this, baseRequest);
}

/**
 *
 * @param key {string}
 * @param value {object}
 * @returns {object}
 * @private
 */
UpdateOrderRequest.prototype.perElementToHash = function(key, value)
{
	if(key == 'orderLines')
	{
		if(value.length > 0)
		{
			var lines = [];
			for(var o in value)
			{
				lines.push(value[o].toHash());
			}
			return {'orderLines':lines};
		}
		else
		{
			return {};
		}
	}
	return false;
}

/**
 *
 * @param key {string}
 * @returns {string}
 * @private
 */
UpdateOrderRequest.prototype.transformHashKey = function(key) {
	if(key == 'paymentId')
	{
		return 'payment_id';
	}
	if(key == 'orderLines')
	{
		return 'orderLines';
	}

	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}