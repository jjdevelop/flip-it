'use strict';

describe('HomeCtrl', function() {

     beforeEach(module('flipit'));

    describe('HomeCtrl public interfaces', function() {
    	var ctrl,
            scope;

        beforeEach(inject(function ($rootScope, $controller) {
        	scope = $rootScope.$new();

            ctrl = $controller('HomeCtrl as home', {
                $scope: scope,
            });

        }));

        it('should have the expected type properties', function() {
            expect(ctrl.test).toBeDefined();
        });

    });

});
