(function() {
    'use strict';

    var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'gameDiv');

    var cursors;
    var currentState;
    var State = {
        GREEN: 'green',
        RED: 'red'
    };

    var createSquare = function(x, y) {
        return function (){
            var square = game.add.sprite(x, y, 'square');

            game.physics.arcade.enable(square);

            square.animations.add(State.RED, [0], 1, false);
            square.animations.add(State.GREEN, [1], 1, false);

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

            return square;
        }();
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
                width: 35,
                height: 35
            };

            var point = {
                x: 0,
                y: 0
            };

            var squares = [];

            // Laying out the squares 4x6
            for (var i = 0; i < 6; i++) {
                point.y += squareSize.height * 1;

                for (var t = 0; t < 4; t++) {
                    point.x = squareSize.width * t;

                    squares[t] = createSquare(point.x, point.y);

                    // console.log("square", squares[t]);
  
                    //  Set the scale of the sprite to the random value
                    // squares[t].scale.setTo(10, 10);
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
