var app;
(function (app) {
    (function (usersettings) {
        'use strict';

        var UserSettingsController = (function () {
            function UserSettingsController(user) {
                this.user = user;
            }
            UserSettingsController.prototype.save = function () {
            };
            UserSettingsController.$inject = ['user'];
            return UserSettingsController;
        })();

        angular.module('app.usersettings').controller('app.usersettings.UserSettingsController', UserSettingsController);
    })(app.usersettings || (app.usersettings = {}));
    var usersettings = app.usersettings;
})(app || (app = {}));
//# sourceMappingURL=usersettings.controller.js.map
