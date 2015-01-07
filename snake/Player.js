function Player(id, snake) {
    this.id = id;
    this.snake = snake;
    this.lastTick = 0;
    this.isDead = false;
};

Player.prototype.checkIsDead = function() {
    return this.isDead = this.snake.isOnWall();
};

module.exports = Player;
