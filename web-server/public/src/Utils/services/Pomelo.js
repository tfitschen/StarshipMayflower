define([
    '../module',
    'pomelo'
], function (module) {
    'use strict';

   module.factory('Pomelo', ['$rootScope', '$q',
        function($rootScope, $q){

            var pomelo = window.pomelo;
            var deferred = $q.defer();

            pomelo.init({
                host: window.location.hostname,
                port: "3010",
                log: true
            }, function() {
                deferred.resolve();
            });

            var pomeloInitialized = deferred.promise;

            return {

                request: function(route, parameters) {
                    var deferred = $q.defer();
                    pomeloInitialized.then(function() {
                        pomelo.request(route, parameters, function(data) {
                            if (data.code == 'OK') {
                                deferred.resolve(data.payload);
                            } else {
                                deferred.reject(data.payload);
                            }
                        });
                    });
                    return deferred.promise;
                },

                notify: function(route, parameters) {
                    var deferred = $q.defer();
                    pomeloInitialized.then(function() {
                        pomelo.notify(route, parameters);
                    });
                },

                on: function(route, callback) {
                    pomeloInitialized.then(function() {
                        pomelo.on(route, callback);
                    });
                }

            };

        }
   ]);

});
