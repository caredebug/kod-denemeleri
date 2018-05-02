import axios from "axios";

const _hadiseListe = {
  A: "Açık",
  AB: "Az Bulutlu",
  PB: "Parçalı Bulutlu",
  CB: "Çok Bulutlu",
  HY: "Hafif Yağmurlu",
  Y: "Yağmurlu",
  KY: "Kuvvetli Yağmurlu",
  KKY: "Karla Karışık Yağmurlu",
  HKY: "Hafif Kar Yağışlı",
  K: "Kar Yağışlı",
  YKY: "Yoğun Kar Yağışlı",
  HSY: "Hafif Sağanak Yağışlı",
  SY: "Sağanak Yağışlı",
  KSY: "Kuvvetli Sağanak Yağışlı",
  MSY: "Mevzi Sağanak Yağışlı",
  DY: "Dolu",
  GSY: "Gökgürültülü Sağanak Yağışlı",
  KGY: "Kuvvetli Gökgürültülü Sağanak Yağışlı",
  SIS: "Sisli",
  PUS: "Puslu",
  DMN: "Dumanlı",
  KF: "Toz veya Kum Fırtınası",
  R: "Rüzgarlı",
  GKR: "Güneyli Kuvvetli Rüzgar",
  KKR: "Kuzeyli Kuvvetli Rüzgar",
  SCK: "Sıcak",
  SGK: "Soğuk",
  HHY: "Yağışlı"
};

function _veriDuzenle(veri) {
  let duzgunVeri = [];
  for (let i = 1; i <= 5; i++) {
    let d = new Date(veri["tarihGun" + i]);
    duzgunVeri.push({
      Tarih: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(),
      Hadise: _hadiseListe[veri["hadiseGun" + i]],
      HadiseKod: veri["hadiseGun" + i],
      EnDusuk: veri["enDusukGun" + i],
      EnYuksek: veri["enYuksekGun" + i],
      Ruzgar: veri["ruzgarHizGun" + i]
    });
  }
  return duzgunVeri;
}

const HavaAPI = {
  getIller: function(callback) {
    axios
      .get("https://servis.mgm.gov.tr/api/merkezler/iller")
      .then(function(response) {
        response.data.sort(function(a, b) {
          return a.ilPlaka - b.ilPlaka;
        });
        callback(response.data);
      });
  },
  get5GunlukHava: function(il, callback) {
    console.log(il);
    axios
      .get("https://servis.mgm.gov.tr/api/merkezler?il=" + il)
      .then(function(response) {
        axios
          .get(
            "https://servis.mgm.gov.tr/api/tahminler/gunluk?istno=" +
              response.data[0].gunlukTahminIstNo
          )
          .then(function(response2) {
            let veri = _veriDuzenle(response2.data[0]);
            callback(veri);
          });
      });
  },
  getSaatlikHava: function(il, callback) {
    console.log(il);
    axios
      .get("https://servis.mgm.gov.tr/api/merkezler?il=" + il)
      .then(function(response) {
        console.log(111);
        axios
          .get(
            "https://servis.mgm.gov.tr/api/tahminler/saatlik?istno=" +
              response.data[0].saatlikTahminIstNo
          )
          .then(function(response2) {
            let veri = response2.data[0].tahmin;
            callback(veri);
          });
      });
  }
};

export default HavaAPI;
