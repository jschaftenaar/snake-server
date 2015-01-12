var app = require('http').createServer(handler);
var io  = require('socket.io')(app);
var fs  = require('fs');
var SnakeServer = require('./snake/Game.js');

var serverIp = '0.0.0.0';
var serverPort = 4321;

var players = 0;
var clients = [];
var game = new SnakeServer();

game.onAdvanceTick = function(allPlayersDead) {
    if (!allPlayersDead) {
        io.sockets.emit('status', game.getStatus());
    }
}

io.on('connection', function(socket) {
    console.log('player ' + players + ' connected.');
    clients.push(socket);
    socket.emit('player', { id: players++ });

    socket.on('disconnect', function() {
        clients.splice(clients.indexOf(socket), 1);
    });

    socket.on('start', function() {
        console.log('start game');
        game.startGame();
    });

    socket.on('reset', function() {
        console.log('reset game');
        players = 0;
        clients.forEach(function(client) {
            client.emit('player', { id: players++ });
        });
    });

    socket.on('move', function (frame) {
        console.log(frame);
        game.recieveFrame(frame);
    });
});

function handler(req, res) {
    fs.readFile(__dirname + '/index.html', function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
};

app.listen(serverPort, serverIp);
console.log('Server running on http://' + serverIp + ':' + serverPort);
