var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = new Array();

app.use('/', express.static(__dirname + '/app'));
app.set("/","apps/");

app.get('/', function(req, res){
  res.sendfile('index.html');
});


io.on('connection', function(socket){
    socket.on('userlogin', function(username){
        console.log(socket.request.connection.remoteAddress + " is now " + username);
        var user = new user(username);
        users.push(user);
        socket.username = username;
        syncUsers();
    });
});

var user = function()
{
    var score = 0;
    var czar = false;
    var username = "";

    var constructor = function user(username)
    {
        this.username = username;
    };

    constructor.publicStaticMethod = function() {};

    return constructor;
}();

function syncUsers() {
    io.emit('user sync', { users: this.users, for: 'everyone' });
}

http.listen(83, function(){
  console.log('listening on *:83');
});