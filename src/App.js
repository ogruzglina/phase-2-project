import React, { useState, useEffect, useRef } from 'react';
//import logo from './logo.svg';
import './App.css';
import uuid from 'react-uuid'
//import { participants } from "../db";

import List from './List'

function App() {
  const [ ssParticipants, setSSParticipants ] = useState([]);
  let isFakeUsers = useRef(false);

  useEffect(() => {
  fetch('http://localhost:3000/participants')
    .then(r => r.json())
    .then(data => data.length === 0 ? isFakeUsers.current = true : setSSParticipants(data));
  }, []);

  useEffect(() => {
  //for (let i=0; i<10; i++){ fetch("https://randomuser.me/api/")
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
    //}
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
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <List ssParticipants = { ssParticipants }/>
    </div>
  );
}

export default App;
