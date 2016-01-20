var app;
(function (app) {
    (function (sitesettings) {
        'use strict';

        var SiteSettingsController = (function () {
            function SiteSettingsController(siteSettings, siteSettingsService) {
                this.siteSettingsService = siteSettingsService;
                this.themeNames = [];
                this.siteSettings = siteSettings;
                this.themeNames = siteSettings.availableThemeNames;
            }
            SiteSettingsController.prototype.save = function () {
            };
            SiteSettingsController.$inject = [
                'siteSettings',
                'app.services.SiteSettingsService'
            ];
            return SiteSettingsController;
        })();

        angular.module('app.sitesettings').controller('app.sitesettings.SiteSettingsController', SiteSettingsController);
    })(app.sitesettings || (app.sitesettings = {}));
    var sitesettings = app.sitesettings;
})(app || (app = {}));
//# sourceMappingURL=sitesettings.controller.js.map
