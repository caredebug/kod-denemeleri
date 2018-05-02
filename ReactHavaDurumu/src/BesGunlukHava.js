import React from "react";
import HavaAPI from "./api";
import { Link } from "react-router-dom";
import SaatlikHava from "./SaatlikHava";

const havaicon = {
  position: "fixed",
  padding: "0px",
  "font-size": "60px"
};
const havaderece = {
  "text-align": "right"
};
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

const sehirKutu = {
  "margin-bottom": "20px",
  "margin-top": "20px"
};

class BesGunlukHava extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tahminler: [], sehirAdi: props.match.params.string };
    HavaAPI.get5GunlukHava(props.match.params.string, veri => {
      this.setState({ tahminler: veri });
    });
  }

  getHavaIcon(kod) {
    return _hadiseListe[kod];
  }

  render() {
    return (
      <div class="container">
        <div class="row" style={sehirKutu}>
          <div class="card text-center">
            <div class="card-header">
              <ul class="nav nav-pills card-header-pills">
                <li class="nav-item">
                  <h2>{this.state.sehirAdi}</h2>
                </li>
              </ul>
            </div>
            <div class="card-body">
            <h3>Bu Gün</h3>
              <SaatlikHava sehir={this.state.sehirAdi} />
              <h3>Gelecek 5 Gün</h3>
              <div class="row">
              
                <div class="card-group">
                  {this.state.tahminler.map(t => (
                    <div class="card">
                      <div class="card-body">
                        <div style={havaicon}>
                          {_hadiseListe[t.HadiseKod]}
                        </div>
                        <h5 class="card-title" style={havaderece}>
                          <h3>{t.EnYuksek}</h3>
                          {t.EnDusuk}
                        </h5>
                        <p class="card-text">{t.Hadise}</p>
                        <p class="card-text">
                          Rüzgar Hızı:<b> {t.Ruzgar} m/s</b>{" "}
                          <span
                            class="oi oi-location text-muted"
                            aria-hidden="true"
                          />
                        </p>
                      </div>
                      <div class="card-footer">
                        <small class="text-muted">{t.Tarih}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
       
    );
  }
}

export default BesGunlukHava;
