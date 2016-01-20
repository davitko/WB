(function () {
    'use strict';

    angular.module('app').run(run);

    run.$inject = [
        '$rootScope',
        '$cookies',
        'currentUser',
        'app.services.PendingPostNotifyService'
    ];
    function run(//$scope: ng.IScope,
    $rootScope, $cookies, currentUser, pendingPostNotifyService) {
        $rootScope.$on('$routeChangeError', function () {
        });
        currentUser.userId = $cookies.userId;
        pendingPostNotifyService.run();
    }
})();
//# sourceMappingURL=app.run.js.map
