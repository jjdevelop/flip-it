(function() {
    'use strict';

    var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'gameDiv');

    var State = {
        GREEN: 'green',
        RED: 'red'
    };

    var squares = [];

    // Calculate how many squares can fix on screen
    var calculatedSquareWidth = window.innerWidth / 4;
    var calculatedSquareHeight = window.innerHeight / 6;

    var createSquare = function(x, y) {
        var currentState;

        return function() {
            var square = game.add.sprite(x, y, 'square');

            game.physics.arcade.enable(square);

            square.animations.add(State.RED, [0], 1, false);
            square.animations.add(State.GREEN, [1], 1, false);

            square.inputEnabled = true;
            square.events.onInputDown.add(function() {
                console.log("Inner Width:" + window.innerWidth);
                console.log("Inner Height:" + window.innerHeight);
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

            var point = {
                x: 0,
                y: 0
            };

            var padding = 2;

            // Laying out the squares 4x6
            for (var i = 0; i < 6; i++) {
                point.y = (calculatedSquareHeight + padding) * i;

                for (var t = 0; t < 4; t++) {
                    point.x = (calculatedSquareWidth + padding) * t;
                    var square = createSquare(point.x, point.y);
                    squares.push(square);
                }
            }
        },

        update: function() {
            // Updating width and height
            // TODO need to also update position
            // calculatedSquareWidth = window.innerWidth / 4;
            // calculatedSquareHeight = window.innerHeight / 6;

            squares.forEach(function(square) {
                //  Set the scale of the sprite to the random value
                square.scale.setTo(calculatedSquareWidth / 32, calculatedSquareHeight / 32);
            });
        },

        restartGame: function() {
            game.state.start('main');
        }

    };

    game.state.add('main', mainState);
    game.state.start('main');

})();
