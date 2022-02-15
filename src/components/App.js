import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch } from "react-router-dom";
import uuid from 'react-uuid'
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
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(fakeUsers => {
        if (isFakeUsers.current) {
          const fakeUsersInfo = fakeUsers.map( fakeUser => {
            return {
              id: uuid(),
              name: fakeUser.first_name,
              lastname: fakeUser.last_name,
              email: fakeUser.email,
              address: {
                street: fakeUser.address.street_address,
                city: fakeUser.address.city,
                state: fakeUser.address.state ,
                country: fakeUser.address.country,
                zipCode: fakeUser.address.zip_code,
              },
              groupName: '',
              secretSantaId: 0,
              isRandomGift: true,
              wishlist: "",
              giftPriceRange: {
                min: 0,
                max: 0,
              },
            }
          });
          setSSParticipants(fakeUsersInfo);
          fetchFakeUsers(fakeUsersInfo);
        }
      })
      .catch(err => {
        console.error('Fetch API error: ', err);
      });
    }, []);

  function fetchFakeUsers (fakeUsers) {
      fetch ('http://localhost:3000/participants', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(fakeUsers),
    })
      .then(r => r.json())
      .then(data => console.log(data)); {/* don't forget to delete this or change the logic!! */}
  }
  console.log(ssParticipants)

  return (
    <div className="App">
      <Header/>
      <NavBar />  {/* it should be a child of headers */}
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
