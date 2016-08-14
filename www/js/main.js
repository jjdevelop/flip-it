(function() {
    'use strict';

    var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'gameDiv');

    var cursors;
    var currentState;
    var State = {
        GREEN: 'green',
        RED: 'red'
    };


    var mainState = {

        preload: function() {
            game.stage.backgroundColor = '#71c5cf';

            game.load.spritesheet('square', 'img/sprites/square.png', 32, 32);
        },

        create: function() {
            game.physics.startSystem(Phaser.Physics.ARCADE);

            // Calculate how many squares can fix on screen
            var screenWidth = window.innerWidth;
            var screenHeight = window.innerHeight;

            var squareSize = { 
                width: 10,
                height: 10
            };

            var point = {
                x: 0,
                y: 0
            };

            for (var i = 0; i < 6; i++) {
                point.y += squareSize.height * i;
                point.x += 0;

                for (var t = 0; t < 4; t++) {
                    point.x = squareSize.width * t;
                    var square = game.add.sprite(point.x, point.y, 'square');

                    game.physics.arcade.enable(square);

                    square.animations.add(State.RED, [0], 1, false);
                    square.animations.add(State.GREEN, [1], 1, false);

                    // cursors = game.input.keyboard.createCursorKeys();

                    square.inputEnabled = true;
                    square.events.onInputDown.add(function() { 
                        if (currentState === State.GREEN) {
                            currentState = State.RED;
                            square.animations.play(currentState);
                        } else {
                            currentState = State.GREEN;
                            square.animations.play(currentState);
                        }
                    });

                    //  Pick a random number between -2 and 6
                    var rand = game.rnd.realInRange(-2, 6);

                    //  Set the scale of the sprite to the random value
                    square.scale.setTo(10, 10);
                }
            }
        },

        update: function() {
            // if (cursors.left.isDown) {
            //     square.animations.play('red');
            // } else if (cursors.right.isDown) {
            //     square.animations.play('green');
            // }
        },

        restartGame: function() {
            game.state.start('main');
        }

    };

    game.state.add('main', mainState);
    game.state.start('main');

})();
