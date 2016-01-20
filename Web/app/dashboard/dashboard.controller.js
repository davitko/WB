var app;
(function (app) {
    (function (dashboard) {
        'use strict';

        var DashboardController = (function () {
            function DashboardController(blogPosts) {
                this.blogPosts = [];
                this.blogPosts = blogPosts;
                this.blogPost = blogPosts[0];
            }
            DashboardController.prototype.selectBlogPost = function (uniqueId) {
                var _this = this;
                angular.forEach(this.blogPosts, function (blogPost) {
                    if (blogPost.uniqueId === uniqueId) {
                        _this.blogPost = blogPost;
                    }
                });
            };
            DashboardController.$inject = ['blogPosts'];
            return DashboardController;
        })();

        angular.module('app.dashboard').controller('app.dashboard.DashboardController', DashboardController);
    })(app.dashboard || (app.dashboard = {}));
    var dashboard = app.dashboard;
})(app || (app = {}));
//# sourceMappingURL=dashboard.controller.js.map
