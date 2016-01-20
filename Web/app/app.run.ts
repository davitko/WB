interface IAppCookies {
    userId: string;
}

((): void => {
    'use strict';

    angular
        .module('app')
        .run(run);

    run.$inject = [
        //'$scope',
        '$rootScope',
        '$cookies',
        'currentUser',
        'app.services.PendingPostNotifyService'
    ];
    function run(
        //$scope: ng.IScope,
        $rootScope: ng.IRootScopeService,
        $cookies: IAppCookies,
        currentUser: ICurrentUser,
        pendingPostNotifyService: app.services.IPendingPostNotifyService): void {

        $rootScope.$on('$routeChangeError', (): void => {
        });
        currentUser.userId = $cookies.userId;
        pendingPostNotifyService.run();
    }
})();