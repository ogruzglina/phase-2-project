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

  function handleAddNewUser (newUser) {
    setSSParticipants(ssParticipants => [
      ...ssParticipants,
      newUser
    ]);
    findSecretSanta(newUser);
  }

  function findSecretSanta (newUser) {
    const individualSSUsers = ssParticipants.filter( participant => 
      participant.groupName === '' 
      && participant.id !== newUser.id 
      && participant.isRandomGift === newUser.isRandomGift
      && participant.giftPriceRange.min === newUser.giftPriceRange.min
      && participant.secretSantaId === 0
    );

    const randomSSanta = individualSSUsers[Math.floor(Math.random() * individualSSUsers.length)];

    updateSecretSantaId(newUser, randomSSanta);
    updateSecretSantaId(randomSSanta, newUser);
    alert(`Your Secret Santa is ${randomSSanta.name} ${randomSSanta.lastname} ${randomSSanta.address}`);

    console.log('after match', ssParticipants)
  }

  function updateSecretSantaId (user, ssUser) {
    fetch(`http://localhost:3000/participants/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...user,
        secretSantaId: ssUser.id,
      }),
    })
      .then(r => r.json())
      .then(updatedUser => updateSsParticipants(updatedUser));
  }

  function updateSsParticipants (updatedUser) {
    const updatedSecretSantaId = ssParticipants.map ( participant =>
      participant.id === updatedUser.id ? updatedUser : participant
    );

    setSSParticipants(ssParticipants => updatedSecretSantaId);
  }

  console.log('after match', ssParticipants)

  return (
    <div className="App">
      <Header/>
      <NavBar />  {/* it should be a child of headers */}
      <Switch>
        <Route path="/individualexchange">
          <IndividualExchange onAddNewUser = { handleAddNewUser }/>
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
