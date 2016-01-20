var enhancedErrorLogging;
(function (enhancedErrorLogging) {
    'use strict';

    var ErrorBroker = (function () {
        function ErrorBroker() {
        }
        ErrorBroker.prototype.log = function (error) {
        };
        ErrorBroker.prototype.registerLogger = function (errorLogger) {
        };
        return ErrorBroker;
    })();

    angular.module('app.blocks').service('app.blocks.ErrorBroker', ErrorBroker);
})(enhancedErrorLogging || (enhancedErrorLogging = {}));
//# sourceMappingURL=errorbroker.service.js.map
