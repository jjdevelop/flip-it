(function() {
    'use strict';

    var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'gameDiv');

    var mainState = {

        preload: function() {
            game.stage.backgroundColor = '#71c5cf';

            game.load.spritesheet('square', 'img/sprites/square.png', 128, 128);
        },

        create: function() {
            game.physics.startSystem(Phaser.Physics.ARCADE);

            var square = game.add.sprite(0, 0, 'square');

            game.physics.arcade.enable(square);

            square.animations.add('left', [0], 10, true);
            square.animations.add('right', [1], 10, true);
        },

        restartGame: function() {
            game.state.start('main');
        },

    };

    game.state.add('main', mainState);
    game.state.start('main');

})();
