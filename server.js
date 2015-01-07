var app = require('http').createServer(handler);
var io  = require('socket.io')(app);
var fs  = require('fs');

var SnakeServer = require('./snake/Game.js');

app.listen(1337, '127.0.0.1');

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

    socket.on('move', function (frame) {
        socket.emit('status', game.getStatus());
    });
});

console.log('Server running at http://127.0.0.1:1337/');
