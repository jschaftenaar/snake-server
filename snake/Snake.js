function Snake(length, startingPosition, direction, forbiddenBlocks) {
    this.length             = length || 5;
    this.startingPosition   = startingPosition || 0;
    this.direction          = direction || 'left';
    this.parts              = [];

    for(var i = 0; i < this.length; i++) {
        this.parts.push(this.startingPosition + i);
    }
};

module.exports = Snake;