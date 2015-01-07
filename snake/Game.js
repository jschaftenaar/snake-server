var Player = require('./Player');
var Map = require('./Map');
var Peanut = require('./Peanut');
var Snake = require('./Snake');

Game.prototype.settings = {
    snakeLength: 5,
    numberOfPeanuts: 1,
    numberOfPlayers: 1,
    ticksPerSecond: 1,
};

Game.prototype.peanuts = [];
Game.prototype.players = [];
Game.prototype.map = null;
Game.prototype.tick = 0;
Game.prototype.gameSession = null;

function Game(forbiddenBlocks) {
    this.map = new Map();

    for(var i = 0; i < this.settings.numberOfPlayers; i++) {
        this.players.push(new Player(i, new Snake(this.settings.snakeLength, null, null, this.getOccupiedPositions(), this.map)));
    }

    for (var i = 0; i < this.settings.numberOfPeanuts; i++) {
        this.peanuts.push(new Peanut(this.getOccupiedPositions(), this.map.getSize()));
    }

    this.tick = 0;
};

Game.prototype.startGame = function() {
    this.gameSession = setInterval(this.advanceTick, (1 / this.settings.ticksPerSecond * 1000), this);
};

Game.prototype.onAdvanceTick = function(allPlayersDead) {
    // implement as event listener;
};

Game.prototype.advanceTick = function(game) {
    var allPlayersDead = true;

    game.players.forEach(function(player) {
        if (!player.isDead) {
            allPlayersDead = false;
            player.lastTick = game.tick;
            player.snake.advance();
            player.checkIsDead();
        }
    });

    game.tick++;
    game.onAdvanceTick(allPlayersDead);
};

Game.prototype.recieveFrame = function(frame) {
    var player = this.players[frame.playerId];

    if (player && frame.tick > player.lastTick) {
        player.snake.setNewDirection(frame.direction);
        player.lastTick = this.tick;
    }
};

Game.prototype.getOccupiedPositions = function() {
    var occupiedPositions = [];

    this.players.forEach(function(player) {
        occupiedPositions = occupiedPositions.concat(player.snake.parts);
    });

    this.peanuts.forEach(function(peanut) {
        occupiedPositions.push(peanut.position);
    });

    return occupiedPositions;
};

Game.prototype.getStatus = function() {
    return {
        peanuts: this.peanuts,
        players: this.players,
        tick: this.tick,
        ticksPerSecond: this.settings.ticksPerSecond
    }
};

module.exports = Game;