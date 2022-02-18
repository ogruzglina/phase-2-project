import React, { useEffect, useState } from "react";
//import uuid from 'react-uuid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Popup from './Popup'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function GroupExchange({ onAddNewUser, onFindGroupSSanta,updateSecretSantaId, ssParticipants, setIsShowRes }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isAdded, setIsAdded] = useState(false); 

  const priceRange = ['Choose a Price Range', [0,30], [31, 60], [61, 100], [100, 150], [151, 250], [251, 400], [401,1000]];
  const options = priceRange.map( price => 
    price === 'Choose a Price Range'
      ? <option key = { price } >{ price }</option>
      : <option key = { price } >$ { price[0] } - $ { price[1] }</option>
  );

  const [ selectedPriceRange, setSelectedPriceRange] = useState('Choose a Price Range');
  const [ groupMembers, setGroupMembers] = useState([]);
  const [formData, setFormData] = useState({
   // id: uuid(),
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
   // secretSantaId: 0,
    isRandomGift: true,
    wishlist: '',
    giftPriceRange: {
      min: 0,
      max: 0,
    },
  });

  function handleChange (e) {
    console.log(e.target.value)
    if (e.target.name === 'priceRange') {
      setSelectedPriceRange(e.target.value);
      const min = parseInt(e.target.value.split(' ')[1]);
      const max = parseInt(e.target.value.split(' ')[4]);
      console.log(min,max)
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

  function handleAddGroupMember () {
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

    // setFormData({
    //   name: '',
    //   lastname: '',
    //   email: '',
    //   address: {
    //     street: '',
    //     city: '',
    //     state: '',
    //     country: '',
    //     zipCode: '',
    //   },
    //   groupName: '',
    //   isRandomGift: false,
    //   wishlist: '',
    //   giftPriceRange: {
    //     min: 0,
    //     max: 0,
    //   },
    // })
  }
  console.log('group ',groupMembers)
  
  async function handleSubmit (e) {
    e.preventDefault();
    if (groupMembers.length < 2) {
      alert('Please add more then 1 group member');
    } else {
     //  groupMembers.map( async member => await addToDBandArr(member));
    // getAllUsers();
   
      for (let i = 0; i < groupMembers.length; i++) {
        let member = groupMembers[i];
        await addToDBandArr(member);
      }
      setIsAdded(!isAdded);
    }}
//!!!!!!need to rewrite!!!!!!
    useEffect(() => {
      const group = ssParticipants.filter( participant => 
        participant.groupName === groupMembers[0].groupName);
console.log('useeffect group', group)
        onFindGroupSSanta(group);
    //     setIsShowRes(isAdded)
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
          Submit Group {/*  need a name for this btn */}
        </button>
      </form>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Popup />
        </Box>
      </Modal>
    </div>
  );
  }

export default GroupExchange;
