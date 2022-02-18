import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch } from "react-router-dom";
import uuid from 'react-uuid';
import Home from './Home';
import Header from './Header';
import IndividualExchange from './IndividualExchange';
import GroupExchange from './GroupExchange';
import { Groups } from '@mui/icons-material';


function App() {
  const [ ssParticipants, setSSParticipants ] = useState([]);
  const [ isFoundSS, setIsFoundSS] = useState(false);
  const [ isShowRes, setIsShowRes] = useState(false);
  let isFakeUsers = useRef(false);
  

  useEffect(async () => {
    let req = await fetch('http://localhost:3000/participants');
    let data = await req.json();
    data.length === 0 ? isFakeUsers.current = true : setSSParticipants(data);
  }, []);

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
          //secretSantaId: 0,
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
    let data = await req.json(); {/* don't forget to delete this or change the logic!! */}
    console.log(data);
    return data;
  }

   function handleAddNewUser (newUser) {
    setSSParticipants(prevUsers => {
      return ([...prevUsers, newUser]);
    });
  }

  function findSecretSanta (newUser) {
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
      // updateSecretSantaId(newUser, randomSSanta);
      // updateSecretSantaId(randomSSanta, newUser);
     // alert(`Your Secret Santa is ${randomSSanta.name} ${randomSSanta.lastname} ${randomSSanta.address}`);

      setIsFoundSS(prevFound => true);
    }
  }
let groupName;

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
         giveGift(giver, recipient)
      }
   }
   let leftoverGiver = group[0]
   let leftoverRecipient = group[group.length-1]
   giveGift(leftoverRecipient, leftoverGiver)
   group.map(user => {
    const secretSanta = group.find(ssuser => ssuser.id === user.secretSantaId)
    alert(`${user.name}, your Secret Santa is ${secretSanta.name} ${secretSanta.lastname}`)
   })
   
}




//rewrite!!!!!!!!!!!!!!
//   async function findGroupSecretSanta (newUser) {
//     console.log('newUser', newUser);
//     console.log('sspart from fimnd', ssParticipants)

//     const groupSSUsers = ssParticipants.filter( participant => 
//       participant.groupName === newUser.groupName && participant.id !== newUser.id
//     );
//     //const groupSS = groupSSUsers.filter(participant => participant.id !== newUser.id );
// //debugger;
//     const ssid = groupSSUsers.map(user => user.secretSantaId !== 0 ? [user.id, user.secretSantaId] : null);
//     console.log("SSID is:", ssid);

//     const groupAgain = groupSSUsers.filter(participant => 
//         ssid.includes([participant.id, participant.secretSantaId]) ? null : participant);
    
//         console.log('findgroup ',groupAgain)

//     const randomSSanta = groupAgain[Math.floor(Math.random() * groupAgain.length)];
//      console.log('random', randomSSanta)

//      await updateSecretSantaId(newUser, randomSSanta); 
//      groupName = newUser.groupName;

    
//  }


  let updateSecretSantaId = async (user) => {//, ssUser) => {
  //  debugger;
    console.log('patch ', user)//, ssUser)
    let req = await fetch(`http://localhost:3000/participants/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...user,
        secretSantaId: user.secretSantaId,
      }),
    });
    let updatedUser = await req.json();
    console.log('Updated Secret Santa', updatedUser);
    console.log('--------------------------------')
    console.log('SS Participants', ssParticipants);
    let existingParticipant = ssParticipants.find(participant => participant.id === updatedUser.id);
    if (existingParticipant) {
      let newParticipantList = [...ssParticipants.filter(x => x.id !== updatedUser.id), updatedUser]
      setSSParticipants(newParticipantList)
    }
  }

  //  function updateSsParticipants(updatedUser) {
  //  // debugger;
  //   const updatedSecretSantaId = ssParticipants.map( participant =>
  //     participant.id === updatedUser.id ? updatedUser : participant
  //   );
   
  //   setSSParticipants(updatedSecretSantaId);
  // }




  console.log('end of app ', ssParticipants);

  function deleteMatchedUsers () {
    const matchedUsers = ssParticipants.filter( participant => participant.secretSantaId );
console.log('matchedUsers - ', matchedUsers)
    matchedUsers.map( user =>
      deleteFetch (user.id)
      // fetch(`http://localhost:3000/participants/${user.id}`, {
      //   method: 'DELETE',
      // })
      //   .then( r => r.json())
      //   .then( () => handleDelete(user.id))
    );
  }

  let deleteFetch = async (userId) => {
    let req = await fetch(`http://localhost:3000/participants/${userId}`, {
    method: 'DELETE',
    });
    let update = req.json();
    handleDelete(userId);
    return update;
}

   function handleDelete (userId) {
    const updatedSsParticipants = ssParticipants.filter( participant => participant.id !== userId);

    return setSSParticipants(updatedSsParticipants);
     
  }

  if ( isFoundSS ) {
    deleteMatchedUsers ();

    setIsFoundSS (false);
  }



  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route path="/individual-exchange">
          <IndividualExchange onAddNewUser = { handleAddNewUser } onFindSSanta = { findSecretSanta }/>
        </Route>
        <Route path="/group-exchange">
          <GroupExchange //getAllUsers = {getAllUsers}
            onAddNewUser = { handleAddNewUser } 
            onFindGroupSSanta = { findGroupSecretSanta } 
            updateSecretSantaId = { updateSecretSantaId }
            onUpdateSSId = { updateSecretSantaId }
            ssParticipants = { ssParticipants }
            setIsShowRes={setIsShowRes}
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
