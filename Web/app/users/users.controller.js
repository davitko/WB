var app;
(function (app) {
    (function (users) {
        'use strict';

        var UsersController = (function () {
            function UsersController() {
                this.user = this.createEmptyUser();
            }
            UsersController.prototype.edit = function (uniqueId) {
            };

            UsersController.prototype.delete = function (uniqueId) {
            };

            UsersController.prototype.save = function () {
            };

            UsersController.prototype.cancel = function () {
                this.user = this.createEmptyUser();
            };

            UsersController.prototype.createEmptyUser = function () {
                return {
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    twitterUsername: '',
                    socialNetworks: []
                };
            };
            UsersController.$inject = [];
            return UsersController;
        })();

        angular.module('app.users').controller('app.users.UsersController', UsersController);
    })(app.users || (app.users = {}));
    var users = app.users;
})(app || (app = {}));
//# sourceMappingURL=users.controller.js.map
