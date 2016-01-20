var app;
(function (app) {
    (function (blogposts) {
        'use strict';

        var BlogPostController = (function () {
            function BlogPostController(blogPost) {
                if (blogPost) {
                    this.uniqueId = blogPost.uniqueId;
                    this.title = blogPost.title;
                    this.body = blogPost.body;
                    this.slug = blogPost.slug;
                    this.description = blogPost.description;
                    this.tags = blogPost.tags.join(',');
                    this.publishedDate = blogPost.publishedDate;
                }
            }
            BlogPostController.prototype.save = function () {
            };
            BlogPostController.$inject = ['blogPost'];
            return BlogPostController;
        })();

        angular.module('app.blogposts').controller('app.blogposts.BlogPostController', BlogPostController);
    })(app.blogposts || (app.blogposts = {}));
    var blogposts = app.blogposts;
})(app || (app = {}));
//# sourceMappingURL=blogpost.controller.js.map
