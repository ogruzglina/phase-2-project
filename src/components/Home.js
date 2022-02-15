import React from "react";
import GroupExchange from "./GroupExchange";
import IndividualExchange from "./IndividualExchange";
import Popup from "./Popup";
import JoinExchangeCards from "./JoinExchangeCards";


function Home() {
  return (
    <div>
        {/* Links on the bottom to the individual and group exchange pages*/}
        <GroupExchangeCard/>
        <IndividualExchangeCard/>
        <Popup/>
    </div>
  );
}

export default Home;