import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return( 
    <div>
        <NavLink to="/" exact> Home </NavLink>
        <NavLink to="/individualexchange"> Individual Exchange </NavLink>
        <NavLink to="/groupexchange"> Group Exchange </NavLink>
    </div>
  );
}

export default NavBar;