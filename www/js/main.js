(function () {
    'use strict';
    
    var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'gameDiv');

    var mainState = {

        preload: function() {
            game.stage.backgroundColor = '#71c5cf';
        },

        create: function() {
            game.physics.startSystem(Phaser.Physics.ARCADE);
        },

        restartGame: function() {
            game.state.start('main');
        },

    };

    game.state.add('main', mainState);
    game.state.start('main');

})();