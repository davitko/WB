var app;
(function (app) {
    (function (services) {
        (function (errorLoggers) {
            'use strict';

            var ServerErrorLogger = (function () {
                function ServerErrorLogger() {
                }
                ServerErrorLogger.prototype.log = function (error) {
                };
                return ServerErrorLogger;
            })();
        })(services.errorLoggers || (services.errorLoggers = {}));
        var errorLoggers = services.errorLoggers;
    })(app.services || (app.services = {}));
    var services = app.services;
})(app || (app = {}));
//# sourceMappingURL=servererrorlogger.service.js.map
