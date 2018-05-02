import React from "react";
import HavaAPI from "./api";
import { Link } from "react-router-dom";

const sehirKutu={
  'margin-bottom': '20px'
}

class SehirListesi extends React.Component {
  constructor(props) {
    super(props);
    this.state = { iller: [] };
    const _iller = HavaAPI.getIller(veri => {
      this.setState({ iller: veri });
    });
  }

  render() {
    return (
      <div class="row">
        {this.state.iller.map(s => (
          <Link class=" col-md-4" style={sehirKutu} to={`/SehirListesi/${s.il}`}>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">
                  {s.il} - {s.ilPlaka}
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">{s.ilce}</h6>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

export default SehirListesi;
