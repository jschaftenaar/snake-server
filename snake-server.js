module.exports = {
    map: {
        width : 20,
        height: 20,

        create: function(width, height) {
            if (width) {
                this.width = width;
            }

            if (height) {
                this.height = height;
            }

            return {
                width: this.width,
                height: this.height,
                size: this.width * this.height
            };
        }
    },

    snake: {
        length: 5,
        directin: 'left',
        startingPosition: 0,

        create: function(length, startingPosition, direction, forbiddenBlocks) {
            this.length = length || this.length;
            this.startingPosition = startingPosition || this.startingPosition;
            this.direction = direction || this.direction;

            for(var i = 0; i < this.length; i++) {
                parts.push(start + i);
            }

            return {
                direction: this.direction,
                parts: parts
            }
        }
    },

    peanut: {
        create: function(forbiddenBlocks) {
            var spot = false;

            while (spot === false) {
                spot = Math.floor((Math.random() * this.mapSize()) + 0);
                if (forbiddenBlocks.indexOf(spot)) {
                    spot = false;
                }
            }

            return {
                position: spot
            }
        }
    },

    player: {
        create: function(id, snake) {
            return {
                id: this.id,
                snake: snake
            }
        }
    },

    game: {
        settings: {
            snakeLength: 5,
            numberOfPeanuts: 1,
            numberOfPlayers: 1
        },

        peanuts: [],
        players: [],
        map: null,

        start: function() {
            this.map = map.create();

            for(var i = 0; i < this.settings.numberOfPlayers; i++) {
                this.players.push(player.create(i, snake.create(this.settings.snakeLength, null, null, game.getOccupiedPositions())));
            }

            for (var i = 0; i < this.settings.numberOfPeanuts; i++) {
                this.peanuts.push(peanut.create(this.getOccupiedPositions()));
            }
        },

        getOccupiedPositions: function() {
            var occupiedPositions = [];

            this.players.forEach(function(player) {
                occupiedPositions = allSnakePositions.concat(player.snake);
            });

            this.peanuts.forEach(function(peanut) {
                occupiedPositions.push(peanut.position);
            });

            return occupiedPositions;
        },

        getStatus: function() {
            return {
                'peanuts': peanuts,
                'players': players
            };
        }
    }
}

