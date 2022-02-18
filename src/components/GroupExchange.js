import React, { useState } from "react";
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


function GroupExchange({ onAddNewUser, onFindGroupSSanta }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const priceRange = ['Choose a Price Range', [0,30], [31, 60], [61, 100], [100, 150], [151, 250], [251, 400], [401,1000]];
  const options = priceRange.map( price => 
    price === 'Choose a Price Range'
      ? <option key = { price } >{ price }</option>
      : <option key = { price } >$ { price[0] } - $ { price[1] }</option>
  );

  const [ selectedPriceRange, setSelectedPriceRange] = useState('Choose a Price Range');
  const [ groupMembers, setGroupMembers] = useState([]);
  const [formData, setFormData] = useState({
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
    secretSantaId: 0,
    isRandomGift: false,
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
      console.log(formData.name, formData.lastname,formData.email, formData.groupName)
    } else {
      setGroupMembers([
        ...groupMembers,
        formData,
      ]);
    }

    const form = document.querySelector("#form"); 
    form.reset(); 
  }
  console.log('group ',groupMembers)
  
  function handleSubmit (e) {
    e.preventDefault();
    if (groupMembers.length < 3) {
      alert('Please add more then 2 group members');
    } else {
      groupMembers.map( member =>
        fetch('http://localhost:3000/participants', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(member),
        })
          .then(r => r.json())
          .then( newMember => {
            onAddNewUser(newMember);
          })
      );
      setGroupMembers([]);
      //onFindGroupSSanta();
    }

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










  

  
  // function handleSubmit(e){
  //   e.preventDefault(); 

  //   if (groupMembers.length <= 1) {
  //     alert('Please add more participants, more than one person is needed to exchange!');
  //   } else {
  //   groupMembers.map( member =>
  //   fetch("http://localhost:3000/participants", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(
  //       member
  //     ),
  //   })
  
  //     .then((r) => r.json())
  //     .then((data) => { 
  //                       addNewUserToGroupExchange(data)
  //                     }))

  //                     setGroupMembers([]);

  //     alert(`Your Secret Santa group, ${group} ,has been created!`);
  //     setOpen(true)
  //     }

  //     const form = document.querySelector("#form"); 
  //     form.reset(); 

      

  // }