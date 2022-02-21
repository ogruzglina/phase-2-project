import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './Home';
import Header from './Header';
import IndividualExchange from './IndividualExchange';
import GroupExchange from './GroupExchange';

function App() {
  const [ ssParticipants, setSSParticipants ] = useState([]);
  const [ isFoundSS, setIsFoundSS] = useState(false);
  let isFakeUsers = useRef(false);

  useEffect(async () => {
    let req = await fetch('http://localhost:3000/participants');
    let data = await req.json();
    data.length === 0 ? isFakeUsers.current = true : setSSParticipants(data);
  }, []);

  // it'll run just once to get fake users from an API
  useEffect(async () => { 
    let request = await fetch('https://random-data-api.com/api/users/random_user?size=10');
    let fakeUsers = await request.json();

    if (isFakeUsers.current) {
      let i = 0;
      const fakeUsersInfo = fakeUsers.map( fakeUser => {
        return {
          id: i++,
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
          isRandomGift: true,
          wishlist: "",
          giftPriceRange: {
            min: 0,
            max: 0,
          },
        }
      })
      setSSParticipants(fakeUsersInfo);
      fetchFakeUsers(fakeUsersInfo);
    }
  }, [])
 

  let fetchFakeUsers = async (fakeUsers) => {
    let req = await fetch ('http://localhost:3000/participants', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(fakeUsers),
    })
    let data = await req.json(); 

    return data;
  }

   function handleAddNewUser(newUser) {
    setSSParticipants(prevUsers => {
      return ([...prevUsers, newUser]);
    });
  }

  function findSecretSanta(newUser) {
    const individualSSUsers = ssParticipants.filter( participant => 
      participant.groupName === '' 
      && participant.id !== newUser.id 
      && participant.isRandomGift === newUser.isRandomGift
      && participant.giftPriceRange.min === newUser.giftPriceRange.min
      && !participant.secretSantaId
    );

    if ( individualSSUsers.length > 0 ) {
      const randomSSanta = individualSSUsers[Math.floor(Math.random() * individualSSUsers.length)];
      individualGiveGift(newUser, randomSSanta)
      alert(`${newUser.name}, your Secret Santa is ${randomSSanta.name} ${randomSSanta.lastname} ${randomSSanta.address}`)
      
      individualGiveGift(randomSSanta, newUser)
      setIsFoundSS(prevFound => true);
    }
  }

  async function individualGiveGift(giver, recipient) {
    if (!recipient.secretSantaId) {
      recipient.secretSantaId = giver.id 
      await updateSecretSantaId(recipient)
    }
  }

  async function giveGift(giver, recipient) {
    if (giver.secretSantaId !== recipient.id) {
      recipient.secretSantaId = giver.id 
      await updateSecretSantaId(recipient)
    }
  }

  function findGroupSecretSanta(group) {
    for (let i=0; i < group.length; i++) {
        let giver = group[i];
        let recipient = group[i+1];
        if (giver && recipient) {
          giveGift(giver, recipient);
        }
    }
    let leftoverGiver = group[0];
    let leftoverRecipient = group[group.length-1];
    giveGift(leftoverRecipient, leftoverGiver);
    
    group.map(user => {
      const secretSanta = group.find(ssuser => ssuser.id === user.secretSantaId);
      alert(`${user.name}, your Secret Santa is ${secretSanta.name} ${secretSanta.lastname}`);
    });  
  }


  let updateSecretSantaId = async (user) => {
    let req = await fetch(`http://localhost:3000/participants/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...user,
        secretSantaId: user.secretSantaId,
      }),
    });
    let updatedUser = await req.json();
    let existingParticipant = ssParticipants.find(participant => participant.id === updatedUser.id);
    if (existingParticipant) {
      let newParticipantList = [...ssParticipants.filter(x => x.id !== updatedUser.id), updatedUser]
      setSSParticipants(newParticipantList)
    }
  }

  function deleteMatchedUsers() {
    const matchedUsers = ssParticipants.filter( participant => participant.secretSantaId );
    matchedUsers.map( user => deleteFetch (user.id) );
  }

  let deleteFetch = async (userId) => {
    let req = await fetch(`http://localhost:3000/participants/${userId}`, {
    method: 'DELETE',
    });
    let update = req.json();
    handleDelete(userId);
    return update;
  } 

  function handleDelete(userId) {
    const updatedSsParticipants = ssParticipants.filter( participant => participant.id !== userId);

    return setSSParticipants(updatedSsParticipants); 
  }

  // checking if we need to delete matched users
  if ( isFoundSS ) {
    deleteMatchedUsers ();
    setIsFoundSS (false);
  }

  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route path="/individual-exchange">
          <IndividualExchange 
            onAddNewUser = { handleAddNewUser } 
            onFindSSanta = { findSecretSanta }
          />
        </Route>
        <Route path="/group-exchange">
          <GroupExchange 
            onAddNewUser = { handleAddNewUser } 
            onFindGroupSSanta = { findGroupSecretSanta } 
            ssParticipants = { ssParticipants }
          />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
    
  );
}

export default App;
