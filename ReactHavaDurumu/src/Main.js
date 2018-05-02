import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import BesGunlukHava from './BesGunlukHava'

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path='/SehirListesi/:string' component={BesGunlukHava} />
    </Switch>
  </main>
);

export default Main;
