import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import uuid from 'react-uuid'

import List from '../List'
import Home from './Home';
import Header from './Header';
import IndividualExchange from './IndividualExchange';
import GroupExchange from './GroupExchange';
import NavBar from './NavBar';

function App() {
  const [ ssParticipants, setSSParticipants ] = useState([]);
  let isFakeUsers = useRef(false);

  useEffect(() => {
  fetch('http://localhost:3000/participants')
    .then(r => r.json())
    .then(data => data.length === 0 ? isFakeUsers.current = true : setSSParticipants(data));
  }, []);

  useEffect(() => {
    fetch('https://random-data-api.com/api/users/random_user?size=10')
      .then(response => response.json())
      .then(fakeUsers => {
        if (isFakeUsers.current) {
          const fakeUsersInfo = fakeUsers.map( fakeUser => {
            return {
              id: uuid(),
              name: fakeUser.first_name,
              lastname: fakeUser.last_name,
              login: {
                username: fakeUser.username,
                password: fakeUser.password,
              },
              email: fakeUser.email,
              address: {
                street: fakeUser.address.street_address,
                city: fakeUser.address.city,
                state: fakeUser.address.state ,
                country: fakeUser.address.country,
                zipCode: fakeUser.address.zip_code,
              },
              isInSSGroup: false,
              secretSantaId: 0,
              isRandomGift: false,
              giftPriceRange: {
                min: 0,
                max: 30,
              },
            }
          });
          setSSParticipants(fakeUsersInfo);
          fetchFakeUsers(fakeUsersInfo);
        }
      })
      .catch(err => {
        console.error(err);
      });
    }, []);

  function fetchFakeUsers (fakeUsers) {
      fetch ('http://localhost:3000/participants', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(fakeUsers),
    })
      .then(r => r.json())
      .then(data => console.log(data));
  }


  

  return (
    <div className="App">
      {/* <List ssParticipants = { ssParticipants }/> */}
      <Header/>
      <NavBar />
      {/* <Home/> */}
        <Switch>
        <Route path="/individualexchange">
          <IndividualExchange />
        </Route>
        <Route path="/groupexchange">
          <GroupExchange />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
    
  );
}

export default App;
