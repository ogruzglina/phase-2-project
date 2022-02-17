import React from "react";
import NavBar from './NavBar';

function Header() {
  return (
    <header >
      <img 
        src='https://static.vecteezy.com/system/resources/previews/004/265/132/non_2x/secret-santa-modern-calligraphy-inscription-holidays-decor-vector.jpg' 
        alt='ss logo'
        style={{ height: '350px' }}
      />
      <img
        src="https://sneakysanta.com/img/sneakysanta-main-hero.png"
        alt="secret santa"
      />
      <NavBar />
    </header>
  );
}

export default Header;