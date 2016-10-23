(function() {
    'use strict';

    var barHeight = 45;

    var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, (window.innerHeight * window.devicePixelRatio) - barHeight, Phaser.CANVAS, 'gameDiv');

    var State = {
        GREEN: 'green',
        RED: 'red'
    };

    var maxColNum = 4;
    var maxRowNum = 6;

    var squares = [];

    // Calculate how many squares can fix on screen
    var calculatedSquareWidth = window.innerWidth / maxColNum;
    var calculatedSquareHeight = (window.innerHeight - barHeight) / maxRowNum;

    var toggleSquares = function(row, col) {

        var touchingSquares = [];

        var rows = [];
        var cols = [];

        if (row > 0)
            rows.push(row - 1);

        rows.push(row);

        if (row < maxRowNum - 1)
            rows.push(row + 1);


        if (col > 0)
            cols.push(col - 1);

        cols.push(col);

        if (col < maxColNum - 1)
            cols.push(col + 1);

        for (var c = 0; c < rows.length; c++) {

            var currentrow = rows[c];

            for (var r = 0; r < cols.length; r++) {

                var currentcol = cols[r];

                // if (row != currentrow && col != currentcol) {
                    var touchingSquare = squares[currentrow][currentcol];

                    /*touchingSquares.push(touchingSquare);*/

                    if (touchingSquare.currentState === State.GREEN) {
                        touchingSquare.currentState = State.RED;
                        touchingSquare.animations.play(touchingSquare.currentState);
                    } else {
                        touchingSquare.currentState = State.GREEN;
                        touchingSquare.animations.play(touchingSquare.currentState);
                    }
                // }

            }
        }
    };


    var createSquare = function(x, y, row, col) {
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

                // var touchingSquares = toggleSquares(row, col);

                // if (currentState === State.GREEN) {
                //     currentState = State.RED;
                //     square.animations.play(currentState);
                // } else {
                //     currentState = State.GREEN;
                //     square.animations.play(currentState);
                // }

                toggleSquares(row, col);
            });

            return square;
        }();
    };


    var mainState = {

        preload: function() {
            game.stage.backgroundrowor = '#71c5cf';

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
            for (var i = 0; i < maxRowNum; i++) {
                point.y = (calculatedSquareHeight + padding) * i;

                squares[i] = [];

                for (var t = 0; t < maxColNum; t++) {
                    point.x = (calculatedSquareWidth + padding) * t;
                    var square = createSquare(point.x, point.y, i, t);
                    squares[i][t] = square;
                    // squares.push(square);
                }
            }
        },

        update: function() {
            // Updating width and height
            // TODO need to also update position
            // calculatedSquareWidth = window.innerWidth / maxColNum;
            // calculatedSquareHeight = window.innerHeight / maxRowNum;

            /*            squares.forEach(function(square) {
                            //  Set the scale of the sprite to the random value
                            square.scale.setTo(calculatedSquareWidth / 32, calculatedSquareHeight / 32);
                        });*/

            for (var i = 0; i < maxRowNum; i++) {

                for (var t = 0; t < maxColNum; t++) {

                    var square = squares[i][t];

                    square.scale.setTo(calculatedSquareWidth / 32, calculatedSquareHeight / 32);
                }
            }
        },

        restartGame: function() {
            game.state.start('main');
        }

    };

    game.state.add('main', mainState);
    game.state.start('main');

})();
