var app;
(function (app) {
    (function (layout) {
        'use strict';

        var NavigationController = (function () {
            function NavigationController(currentUser, userService) {
                var vm = this;
                userService.getById(currentUser.userId).then(function (user) {
                    vm.fullName = user.firstName + ' ' + user.lastName;
                });
            }
            NavigationController.$inject = [
                'currentUser',
                'app.services.UserService'
            ];
            return NavigationController;
        })();

        angular.module('app.layout').controller('app.layout.NavigationController', NavigationController);
    })(app.layout || (app.layout = {}));
    var layout = app.layout;
})(app || (app = {}));
//# sourceMappingURL=navigation.controller.js.map
