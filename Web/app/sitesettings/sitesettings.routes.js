(function () {
    'use strict';

    angular.module('app.sitesettings').config([
        '$routeProvider',
        '$locationProvider',
        config]);

    function config($routeProvider, $locationProvider) {
        $routeProvider.when('/admin/sitesettings', {
            templateUrl: 'app/sitesettings/sitesettings.html',
            controller: 'app.sitesettings.SiteSettingsController',
            controllerAs: 'vm',
            resolve: {
                siteSettings: siteSettingsResolve
            }
        });
    }

    siteSettingsResolve.$inject = ['app.services.SiteSettingsService'];
    function siteSettingsResolve(siteSettingsService) {
        return siteSettingsService.getSettings().then(function (siteSettings) {
            return siteSettingsService.getThemes().then(function (themeNames) {
                siteSettings.availableThemeNames = themeNames;
                return siteSettings;
            });
        });
    }
})();
//# sourceMappingURL=sitesettings.routes.js.map
