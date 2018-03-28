let socketio = require('socket.io')

module.exports.listen = function (server) {
    let io = socketio.listen(server)

    // ------------------------------ Traitement du socket
    let objUtilisateur = {}
    io.on('connection', function (socket) {
        TRAITEMENT DE LA CONNECTION DES USERS
        socket.on('setUser', function (data) {
            objUtilisateur[socket.id] = data.user;
            socket.emit('valide_user', data);
            io.sockets.emit('diffuser_liste_user', objUtilisateur);
        })

        socket.on('setMessage', function (data) {
            data.user = objUtilisateur[socket.id];
            socket.broadcast.emit('diffuserMessage', data);
            socket.emit('valideMessage', data);
        })

        socket.on('disconnect', function () {
            delete objUtilisateur[socket.id];
            io.sockets.emit('diffuser_destruction_user', objUtilisateur);

        })
    })
    return io
}
