
function Logger() {
}

Logger.prototype.debug = function(message) {
    console.log('[debug] ' + message);
};

Logger.prototype.information = function(message) {
    console.log('[information] ' + message);
};

Logger.prototype.warning = function(message) {
    console.log('[warning] ' + message);
};

Logger.prototype.error = function(message) {
    console.log('[error] ' + message);
};
