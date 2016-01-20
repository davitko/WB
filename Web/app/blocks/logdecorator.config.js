(function () {
    'use strict';

    angular.module('app.blocks').config(config);

    config.$inject = ['$provide'];
    function config($provide) {
        $provide.decorator('$log', extendLog);
    }

    extendLog.$inject = ['$delegate'];
    function extendLog($delegate) {
        var debugFunction = $delegate.debug;
        $delegate.debug = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            var now = (new Date()).toLocaleTimeString();
            args[0] = now + ' - ' + args[0];
            debugFunction.apply(null, args);
        };
        return $delegate;
    }
})();
//# sourceMappingURL=logdecorator.config.js.map
