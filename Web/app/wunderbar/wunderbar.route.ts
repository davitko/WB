((): void => {
    'use strict';

    angular
        .module('app.wunderbar')
        .config(config);

    config.$inject = [
        '$routeProvider',
        '$locationProvider'
    ];
    function config(
        $routeProvider: ng.route.IRouteProvider,
        $locationProvider: ng.ILocationProvider): void {
        $routeProvider
            .when('/wunderbar', {
                templateUrl: 'app/wunderbar/wunderbar.html',
                controller: 'app.wunderbar.WunderbarController',
                controllerAs: 'vm',
                //resolve: {
                //    blogPosts: resolveWunderbar
                //}
            });
    }

    //resolveWunderbar.$inject = ['app.services.WunderbarService'];
    //function resolveWunderbar(wunderbarService: app.services.IBlogPostService): void {

    //}

})();