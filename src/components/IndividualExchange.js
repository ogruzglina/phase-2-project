 import React, { useState } from "react";
 import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';

function IndividualExchange({ onAddNewUser, onFindSSanta }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const priceRange = ['Choose a Price Range', [0,30], [31, 60], [61, 100], [100, 150], [151, 250], [251, 400], [401,1000]];
  const address = ['street', 'city', 'state', 'country', 'zipCode'];
  const options = priceRange.map( price =>  
    price === 'Choose a Price Range'
      ? <option key = { price } >{ price }</option>
      : <option key = { price } >$ { price[0] } - $ { price[1] }</option> 
  );

  const [ selectedPriceRange, setSelectedPriceRange] = useState('Choose a Price Range');
  const [ isWishList, setIsWishList] = useState(false);
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
    if ( address.includes(e.target.name)) {
      setFormData({
        ...formData,
        address:{
          ...formData.address,
          [e.target.name] : e.target.value
        },
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name] : e.target.value,
      });
    } 
  }

  function handleChangeRadio (e) {
    if (e.target.name === 'isRandomGift') {
      if (e.target.value === 'randomGift') { 
        setIsWishList(false);
        setFormData({
          ...formData,
          isRandomGift : true,
        })
      } else {
        setIsWishList(true);
        setFormData({
          ...formData,
          isRandomGift : false,
        });
      }
    } else if (e.target.name === 'priceRange') {
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

  function handleSubmit (e) {
    e.preventDefault();
    fetch('http://localhost:3000/participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(r => r.json())
      .then(newUser => {
        const tryv = onAddNewUser(newUser);
        console.log('tryv',tryv)
        onFindSSanta(newUser);
        setOpen(true)
      });

    e.target.reset();
    setFormData({
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
    })
  }

  const showWishListFields = isWishList 
    ? <>
      {/* <input type="textarea" name="wishlist" placeholder="Wish list" onChange = { handleChangeRadio }/> */}
      <textarea name="wishlist" placeholder="Wish list" onChange = { handleChangeRadio }/>
      <label> Gift price range 
        <select name="priceRange" value ={ selectedPriceRange }  onChange={ handleChangeRadio }>
          { options }
        </select>
      </label>
    </>
    : null;
  
  return (
    <div >
      <form onSubmit = { handleSubmit }>
        <div className="inputs">
          <input type="text" name="name" placeholder="Name" onChange = { handleChange } required/>
          <input type="text" name="lastname" placeholder="Lastname" onChange = { handleChange } required/>
          <input type="text" name="street" placeholder="Street Address" onChange = { handleChange } required/>
          <input type="text" name="city" placeholder="City" onChange = { handleChange } required/>
          <input type="text" name="state" placeholder="State" onChange = { handleChange } />
          <input type="text" name="country" placeholder="Country" onChange = { handleChange } required/>
          <input type="text" name="zipCode" placeholder="Zip-code" onChange = { handleChange } required/>
          <input type="email" name="email" placeholder="Email" onChange = { handleChange } required/>
          <br></br>
          <div onChange = { handleChangeRadio }>
            <input type="radio" name="isRandomGift" value="randomGift" /> Random Gift
            <input type="radio" name="isRandomGift" value="wishlist" /> Create a wish list
          </div>
          {showWishListFields}
        </div>

        <button type="submit">
          Submit  {/*  need a name for this btn */}
        </button>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your Random Secret Santa!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Import Data Here.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default IndividualExchange;






