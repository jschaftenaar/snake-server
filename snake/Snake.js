function Snake(length, startingPosition, direction, forbiddenBlocks, map) {
    this.length             = length || 5;
    this.startingPosition   = startingPosition || 25;
    this.direction          = direction || 'left';
    this.newDirection       = this.direction;
    this.parts              = [];
    this.map                = map;

    for(var i = 0; i < this.length; i++) {
        this.parts.push(this.startingPosition + i);
    }
};

Snake.prototype.advance = function(tick) {
    var head = this.parts[0],
        newHead = null;

    this.direction = this.newDirection;

    switch(this.direction) {
        case 'left'     : newHead = head - 1; break;
        case 'right'    : newHead = head + 1; break;
        case 'up'       : newHead = head - this.map.width; break;
        case 'bottom'   : newHead = head + this.map.width; break;
    }

    this.parts.unshift(newHead);
    this.parts.pop();
};

Snake.prototype.isOnWall = function() {
    var head = this.parts[0],
        isOnXWalls = head < 0 || head > this.map.getSize(),
        isOnYWalls = (head + 1) % this.map.width === 0 && this.parts[1] === head + 1 ||
                     (head + 1) % this.map.width === 1 && this.parts[1] === head - 1;

    return head === null ||  isOnXWalls || isOnYWalls;
};

Snake.prototype.setNewDirection = function(newDirection) {
    var xMove = ['left', 'right'],
        yMove = ['up', 'down'],
        isSameX = xMove.indexOf(newDirection) > 0 && xMove.indexOf(this.direction) > 0,
        isSameY = yMove.indexOf(newDirection) > 0 && yMove.indexOf(this.direction) > 0,
        isSameAxisMove = isSameX || isSameY;

    if (!isSameAxisMove && (xMove.indexOf(newDirection) || yMove.indexOf(newDirection))) {
        this.newDirection = newDirection;
    }
};

module.exports = Snake;