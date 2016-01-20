var app;
(function (app) {
    (function (widgets) {
        'use strict';

        var SlugCheckController = (function () {
            function SlugCheckController(blogPostService) {
                this.blogPostService = blogPostService;
            }
            SlugCheckController.prototype.checkSlugInUse = function (slug) {
                return this.blogPostService.checkSlugInUse(slug);
            };
            SlugCheckController.$inject = ['app.services.BlogPostService'];
            return SlugCheckController;
        })();

        var SlugCheckDirective = (function () {
            function SlugCheckDirective() {
                this.restrict = 'A';
                this.controller = SlugCheckController;
            }
            SlugCheckDirective.instance = function () {
                return new SlugCheckDirective;
            };

            SlugCheckDirective.prototype.link = function (scope, element, attributes, controller) {
                element.on('blur', function () {
                    controller.checkSlugInUse(element.val()).then(function (inUse) {
                        console.log(inUse);
                    });
                });
            };
            return SlugCheckDirective;
        })();

        angular.module('app.widgets').directive('blSlugCheck', SlugCheckDirective.instance);

        slugCheck.$inject = ['app.services.BlogPostService'];
        function slugCheck(blogPostService) {
            var directive = {
                restrict: 'A',
                link: link,
                controller: SlugCheckController
            };

            function link(scope, element) {
                element.on('blur', function () {
                    blogPostService.checkSlugInUse(element.val()).then(function (inUse) {
                        console.log(inUse);
                    });
                });
            }

            return directive;
        }
    })(app.widgets || (app.widgets = {}));
    var widgets = app.widgets;
})(app || (app = {}));
//# sourceMappingURL=slugcheck.directive.js.map
