import React from "react";
import HavaAPI from "./api";
import { Link } from "react-router-dom";

const sehirKutu = {
  "margin-bottom": "20px"
};
const havaicon = {
  position: "fixed",
  padding: "0px",
  "font-size": "40px"
};
const havaderece = {
  "text-align": "right"
};

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const _hadiseListe = {
  A: <span class="oi oi-sun text-warning" aria-hidden="true" />,
  AB: <span class="oi oi-cloud text-info" aria-hidden="true" />,
  PB: <span class="oi oi-cloud text-info" aria-hidden="true" />,
  CB: <span class="oi oi-cloud text-info" aria-hidden="true" />,
  HY: <span class="oi oi-rain text-primary" aria-hidden="true" />,
  Y: <span class="oi oi-rain text-primary" aria-hidden="true" />,
  KY: <span class="oi oi-rain text-primary" aria-hidden="true" />,
  KKY: "Karla Karışık Yağmurlu",
  HKY: "Hafif Kar Yağışlı",
  K: "Kar Yağışlı",
  YKY: "Yoğun Kar Yağışlı",
  HSY: <span class="oi oi-rain text-primary" aria-hidden="true" />,
  SY: <span class="oi oi-rain text-primary" aria-hidden="true" />,
  KSY: <span class="oi oi-rain text-primary" aria-hidden="true" />,
  MSY: <span class="oi oi-rain text-primary" aria-hidden="true" />,
  DY: <span class="oi oi-media-record" aria-hidden="true" />,
  GSY: <span class="oi oi-bolt text-warning" aria-hidden="true" />,
  KGY: <span class="oi oi-rain text-primary" aria-hidden="true" />,
  SIS: <span class="oi oi-grid-four-up text-secondary" />,
  PUS: "Puslu",
  DMN: "Dumanlı",
  KF: "Toz veya Kum Fırtınası",
  R: "Rüzgarlı",
  GKR: "Güneyli Kuvvetli Rüzgar",
  KKR: "Kuzeyli Kuvvetli Rüzgar",
  SCK: "oi oi-fire",
  SGK: "Soğuk",
  HHY: <span class="oi oi-rain text-primary" aria-hidden="true" />
};

class SaatlikHava extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tahminler: [] };
    HavaAPI.getSaatlikHava(props.sehir, veri => {
      this.setState({ tahminler: veri });
    });
  }

  /*
  hadise:"PB"
hissedilenSicaklik:17
maksimumRuzgarHizi:17
nem:60
ruzgarHizi:6
ruzgarYonu:105
sicaklik:17
tarih:"2018-05-02T21:00:00.000Z"
  */

getSaat(t){
  let d = new Date(t);
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());
  var s = addZero(d.getSeconds());
  return h + ":" + m ; 
}

  render() {
    return (
      <div class="row">
        <div class="card-group">
          {this.state.tahminler.map(t => (
            <div class="card">
              <div class="card-body">
                <div style={havaicon}>
                {_hadiseListe[t.hadise]}
                </div>
                <h5 class="card-title" style={havaderece}>
                  <h3>{t.sicaklik}</h3>
                </h5>
                <p class="card-text">Nem: %{t.nem}</p>
                <p class="card-text">
                  Rüzgar Hızı:<b> {t.ruzgarHizi} m/s</b>{" "}
                  <span class="oi oi-location text-muted" aria-hidden="true" />
                </p>
              </div>
              <div class="card-footer">
                <small class="text-muted">{this.getSaat(t.tarih)}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default SaatlikHava;
