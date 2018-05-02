import React from "react";
import { Link } from "react-router-dom";

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">
      Hava Durumu
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarColor01"
      aria-controls="navbarColor01"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <Link class="nav-link" to='/'>Şehir Listesi</Link>
          
        </li>
       
      </ul>
    </div>
  </nav>
);

export default Header;
