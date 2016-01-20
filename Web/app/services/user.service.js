var app;
(function (app) {
    (function (services) {
        'use strict';

        var UserService = (function () {
            function UserService($http) {
                this.$http = $http;
            }
            UserService.prototype.getById = function (uniqueId) {
                return this.$http.get('/api/users/' + uniqueId).then(function (response) {
                    return response.data;
                });
            };
            UserService.$inject = ['$http'];
            return UserService;
        })();

        angular.module('app.services').service('app.services.UserService', UserService);
    })(app.services || (app.services = {}));
    var services = app.services;
})(app || (app = {}));
//# sourceMappingURL=user.service.js.map
