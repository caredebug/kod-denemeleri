var server = require('http').createServer();    // http sunucusu oluşturuluyor
var p2pserver = require('socket.io-p2p-server').Server    // p2p sunucusu oluşturuluyor
var io = require('socket.io')(server)   // socket.io http sunucusu üzerinden başlatılıyor

server.listen(1905, function () {   // 1905 portundan soket istekleri dinlenmeye başlıyor
  console.log('Listening on 1905');
})

io.use(p2pserver);    // socket.io'nun p2p bağlantıyı kullanabilmesi sağlanıyor

io.on('connection', function (socket) {   // felen soket bağlantı isteği karşılanıyor

  socket.on('mesaj', function (data) {    // mesaj ismiyle dinleniyor
    console.log('Gelen Mesaj: %s', data);
    socket.broadcast.emit('mesaj', data);   // sokete bağlı herkese geen mesaj gönderiliyor
  })

  socket.on('p2pBaglan', function (data) {  // p2pBaglan ismiyle dinlenip tüm istemcilere de gönderiliyor
    socket.broadcast.emit('p2pBaglan', data);
  })
})