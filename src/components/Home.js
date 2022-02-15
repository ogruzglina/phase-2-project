import React from "react";
import Popup from "./Popup";
import IndividualExchangeCard from "./IndividualExchangeCard";


function Home() {
  return (
    <div>
        {/* Links on the bottom to the individual and group exchange pages*/}
        <IndividualExchangeCard/>
        <Popup/>
    </div>
  );
}

export default Home;