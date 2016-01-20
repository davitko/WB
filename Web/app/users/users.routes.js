(function () {
    'use strict';

    angular.module('app.users').config([
        '$routeProvider',
        '$locationProvider',
        config]);

    function config($routeProvider, $locationProvider) {
        $routeProvider.when('/admin/users', {
            templateUrl: 'app/users/users.html',
            controller: 'app.users.UsersController',
            controllerAs: 'vm'
        });
    }
})();
//# sourceMappingURL=users.routes.js.map
