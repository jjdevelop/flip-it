var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

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