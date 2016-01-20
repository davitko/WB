var app;
(function (app) {
    (function (services) {
        'use strict';

        var PendingPostNotifyService = (function () {
            function PendingPostNotifyService($timeout) {
                this.$timeout = $timeout;
                this.unpublishedCount = 3;
            }
            PendingPostNotifyService.prototype.run = function () {
                var _this = this;
                this.$timeout(function () {
                    console.log(_this.unpublishedCount);
                }, 100);
            };
            PendingPostNotifyService.$inject = ['$timeout'];
            return PendingPostNotifyService;
        })();

        angular.module('app.services').service('app.services.PendingPostNotifyService', PendingPostNotifyService);
    })(app.services || (app.services = {}));
    var services = app.services;
})(app || (app = {}));
//# sourceMappingURL=pendingpostnotify.service.js.map
