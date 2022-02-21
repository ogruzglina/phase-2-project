import React, { useEffect, useState } from "react";

function GroupExchange({ onAddNewUser, onFindGroupSSanta, ssParticipants }) {
  const defaultFormData = {
    name: '',
    lastname: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    },
    groupName: '',
    isRandomGift: false,
    wishlist: '',
    giftPriceRange: {
      min: 0,
      max: 0,
    },
  };
  const [isAdded, setIsAdded] = useState(false); 
  const priceRange = ['Choose a Price Range', [0,30], [31, 60], [61, 100], [100, 150], [151, 250], [251, 400], [401,1000]];
  const options = priceRange.map( price => 
    price === 'Choose a Price Range'
      ? <option key = { price } >{ price }</option>
      : <option key = { price } >$ { price[0] } - $ { price[1] }</option>
  );

  const [ selectedPriceRange, setSelectedPriceRange] = useState('Choose a Price Range');
  const [ groupMembers, setGroupMembers] = useState([]);
  const [ formData, setFormData ] = useState(defaultFormData);

  function handleChange(e) {
    if (e.target.name === 'priceRange') {
      setSelectedPriceRange(e.target.value);
      const min = parseInt(e.target.value.split(' ')[1]);
      const max = parseInt(e.target.value.split(' ')[4]);
      
      setFormData({
        ...formData,
        giftPriceRange: {
          min: min,
          max: max,
        },
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name] : e.target.value,
      });
    }
  }

  function handleAddGroupMember() {
    if (formData.name === '' || formData.lastname === '' || formData.email === '' || formData.groupName === '') { 
      alert("Please enter group member information!");
    } else {
      setGroupMembers([
        ...groupMembers,
        formData,
      ]);
    }

    const form = document.querySelector("#form"); 
    form.reset(); 
    setFormData(defaultFormData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (groupMembers.length < 2) {
      alert('Please add more then 1 group member');
    } else {
      for (let i = 0; i < groupMembers.length; i++) {
        let member = groupMembers[i];
        await addToDBandArr(member);
      }
      setIsAdded(!isAdded);
    }}

  useEffect(() => {
    const group = ssParticipants.filter( participant => 
      participant.groupName === groupMembers[0].groupName );

    onFindGroupSSanta(group);
    setGroupMembers([]);
  }, [isAdded]);

  let addToDBandArr = async (user) => {
    let req = await fetch('http://localhost:3000/participants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
    let data = await req.json();
    onAddNewUser(data);
    
    return data
  }
        
  return (
    <div >
      <h2>Add a Group: </h2>
      <form id='form' onSubmit = { handleSubmit }>
        <div className="inputs">
          <input type="text" name="name" placeholder="Name" onChange = { handleChange } />
          <input type="text" name="lastname" placeholder="Lastname" onChange = { handleChange } />
          <input type="email" name="email" placeholder="Email" onChange = { handleChange } />
          <br></br>
          <label> Gift Price Range:
            <select name="priceRange" value ={ selectedPriceRange } onChange={ handleChange }>
              { options }
            </select>
          </label>
          <input type="text" name="groupName" placeholder="Your group name" onChange = { handleChange } />
        </div>
        <button id="groupButton" type="button" onClick = { handleAddGroupMember }>
          Add Group Member
        </button>
        <button id="submitGroupButton" type="submit">
          Submit Group 
        </button>
      </form>
    </div>
  );
}

export default GroupExchange;