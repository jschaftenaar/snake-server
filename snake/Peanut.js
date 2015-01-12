function Peanut(forbiddenSpots, mapSize) {
    console.log(forbiddenSpots);
    this.relocate(forbiddenSpots, mapSize);
};

Peanut.prototype.position = null;
Peanut.prototype.isEaten  = false;
Peanut.prototype.relocate = function(forbiddenSpots, mapSize) {
    var spot = false;

    while (spot === false) {
        spot = Math.floor((Math.random() * mapSize) + 0);

        if (forbiddenSpots.indexOf(spot) >= 0) {
            spot = false;
        }
    }

    this.position = spot;
};

module.exports = Peanut;