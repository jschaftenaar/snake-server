var app = require('http').createServer(handler);
var io  = require('socket.io')(app);
var fs  = require('fs');

var SnakeServer = require('./snake/Game.js');

var serverIp = '0.0.0.0';
var serverPort = 4321;

app.listen(serverPort, serverIp);

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

var game = new SnakeServer();

io.on('connection', function(socket) {
    socket.emit('status', game.getStatus());

    game.onAdvanceTick = function(allPlayersDead) {
        if (!allPlayersDead) {
            socket.emit('status', game.getStatus());
        }
    }

    socket.on('start', function() {
        game.startGame();
    });

    socket.on('move', function (frame) {
        game.recieveFrame(frame);
        socket.emit('status', game.getStatus());
    });


});

console.log('Server running on http://' + serverIp + ':' + serverPort);
