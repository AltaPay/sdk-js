
function Logger() {
}

/**
 * @param message {string}
 */
Logger.prototype.debug = function(message) {
    console.log('[debug] ' + message);
};

/**
 * @param message {string}
 */
Logger.prototype.information = function(message) {
    console.log('[information] ' + message);
};

/**
 * @param message {string}
 */
Logger.prototype.warning = function(message) {
    console.log('[warning] ' + message);
};

/**
 * @param message {string}
 */
Logger.prototype.error = function(message) {
    console.log('[error] ' + message);
};
