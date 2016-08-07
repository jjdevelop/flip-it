(function() {
    'use strict';

    var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'gameDiv');

    var cursors;
    var square;
    var state;

    var mainState = {

        preload: function() {
            game.stage.backgroundColor = '#71c5cf';

            game.load.spritesheet('square', 'img/sprites/square.png', 32, 32);
        },

        create: function() {
            game.physics.startSystem(Phaser.Physics.ARCADE);

            square = game.add.sprite(0, 0, 'square');

            game.physics.arcade.enable(square);

            square.animations.add('red', [0], 1, false);
            square.animations.add('green', [1], 1, false);

            cursors = game.input.keyboard.createCursorKeys();

            square.inputEnabled = true;
            square.events.onInputDown.add(function() { 
                if (state === 'green') {
                    state = 'red';
                    square.animations.play('red');
                } else {
                    state = 'green';
                    square.animations.play('green');
                }
            });
        },

        restartGame: function() {
            game.state.start('main');
        },

        update: function() {
            if (cursors.left.isDown) {
                square.animations.play('red');
            } else if (cursors.right.isDown) {
                square.animations.play('green');
            }
        }

    };



    game.state.add('main', mainState);
    game.state.start('main');

})();
