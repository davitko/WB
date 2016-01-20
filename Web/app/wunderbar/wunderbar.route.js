(function () {
    'use strict';

    angular.module('app.wunderbar').config(config);

    config.$inject = [
        '$routeProvider',
        '$locationProvider'
    ];
    function config($routeProvider, $locationProvider) {
        $routeProvider.when('/wunderbar', {
            templateUrl: 'app/wunderbar/wunderbar.html',
            controller: 'app.wunderbar.WunderbarController',
            controllerAs: 'vm'
        });
    }
    //resolveWunderbar.$inject = ['app.services.WunderbarService'];
    //function resolveWunderbar(wunderbarService: app.services.IBlogPostService): void {
    //}
})();
//# sourceMappingURL=wunderbar.route.js.map
