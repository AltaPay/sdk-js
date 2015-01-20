
function DateHelper() {
}

/**
 * Format a date
 * @param format {string} Currently supported values are "Y,m,d,H,i.s" (like in PHP)
 * @param date {Date}
 * @returns {string}
 */
DateHelper.prototype.formatDate = function(format, date) {
    var result = '';

    for (var i=0; i!=format.length; i++) {
        switch (format[i]) {
            case 'Y':
                result += date.getFullYear();
                break;

            case 'm':
                result += this.padLeft(date.getMonth() + 1, 2, '0');
                break;

            case 'd':
                result += this.padLeft(date.getDate(), 2, '0');
                break;

            case 'H':
                result += this.padLeft(date.getHours(), 2, '0');
                break;

            case 'i':
                result += this.padLeft(date.getMinutes(), 2, '0');
                break;

            case 's':
                result += this.padLeft(date.getSeconds(), 2, '0');
                break;

            default:
                result += format[i];
                break;
        }
    }

    return result;
};

/**
 * Left pad a string
 * @param value {string}
 * @param length {number}
 * @param padding {string}
 * @returns {string}
 * @private
 */
DateHelper.prototype.padLeft = function(value, length, padding) {
    padding = padding || '0';
    return (value.toString().length < length) ? this.padLeft(padding+value, length, padding) : value;
};
