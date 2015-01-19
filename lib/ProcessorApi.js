
/**
 * Connector for the AltaPay Processor API.
 *
 * @param username The API username for AltaPay
 * @param password The API user's password
 * @param url The url for the gateway (e.g. "testgateway.pensio.com")
 * @param factory {AltaPayFactory}
 * @param logger {Logger}
 * @param http {Http}
 * @constructor
 */
function ProcessorApi(username, password, url, factory, logger, http) {
    this.username = username;
    this.password = password;
    this.url = url;

    this.factory = factory;
    this.logger = logger;
    this.http = http;
}