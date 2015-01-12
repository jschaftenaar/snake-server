function Map(width, height) {
    if (width) {
        this.width = width;
    }

    if (height) {
        this.height = height;
    }
};

Map.prototype.width  = 32;
Map.prototype.height = 25;

Map.prototype.getSize = function () {
    return this.width * this.height;
};


module.exports = Map;