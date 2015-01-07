function Peanut(forbiddenSpots, mapSize) {
    var spot = false;

    while (spot === false) {
        spot = Math.floor((Math.random() * mapSize) + 0);
        if (forbiddenSpots.indexOf(spot)) {
            spot = false;
        }
    }

    this.position = spot;
};

Peanut.prototype.position = null;

module.exports = Peanut;