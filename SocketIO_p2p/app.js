var socket = io('http://localhost:1905');   // soket sunucusuna bağlanıyor
var opts = {autoUpgrade: false }    // p2p bağlantı ayarları yapılıyor. autoUpgrade: false tanımıyla başlangıçta normal soket bağlantısı sağlanıyor
var p2psocket = new P2P(socket, opts)   // p2p destekli soket bağlantısı sağlanıyor

p2psocket.on('mesaj', function (data) {   // mesaj ismiyle soket dinleniyor
  var li = document.createElement('li');  // li nesnesi oluşturuluyor
  li.appendChild(document.createTextNode(data));  // gelen mesaj li nesnesine ekleniyor
  document.getElementById("liste").appendChild(li);   // li nesnesi ekrandaki ul türükdeki listeye ekleniyor
})

p2psocket.on('p2pBaglan', function () {
  p2psocket.useSockets = false;   // normal soket bağlantısı kapatılıyor
  p2psocket.upgrade();    // p2p bağlantı sağlanıyor
  console.log("P2P bağlatı");
})

function MesajAt() {
  // mesaj kanalıyla sunucuya veya doğrusan diğer istemcilere gönderiliyor
  p2psocket.emit('mesaj', p2psocket.peerId +" : " + document.getElementById("txt").value);

  var li = document.createElement('li');
  li.appendChild(document.createTextNode(p2psocket.peerId +" : " + document.getElementById("txt").value));
  document.getElementById("liste").appendChild(li);
}

function P2PBaglantiyaGec() {
  p2psocket.emit('p2pBaglan',true);
  p2psocket.useSockets = false;
  p2psocket.upgrade();
  console.log("P2P bağlatı");
}