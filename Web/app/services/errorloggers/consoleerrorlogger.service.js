var app;
(function (app) {
    (function (services) {
        (function (errorLoggers) {
            'use strict';

            var ConsoleErrorLogger = (function () {
                function ConsoleErrorLogger() {
                }
                ConsoleErrorLogger.prototype.log = function (error) {
                };
                return ConsoleErrorLogger;
            })();
        })(services.errorLoggers || (services.errorLoggers = {}));
        var errorLoggers = services.errorLoggers;
    })(app.services || (app.services = {}));
    var services = app.services;
})(app || (app = {}));
//# sourceMappingURL=consoleerrorlogger.service.js.map
