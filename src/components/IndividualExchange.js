 import React, { useState } from "react";

// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';

function IndividualExchange({ onAddNewUser }) {
  const priceRange = [[0,30], [31, 60], [61, 100], [100, 150], [151, 250], [251, 400], [401,1000]];
  const options = priceRange.map( price => 
    <option key = { price } >$ { price[0] } - $ { price[1] }</option>
  );
  const [ selectedPriceRange, setSelectedPriceRange] = useState('$ 0 - $ 30');
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
    if (e.target.name === 'street' 
      || e.target.name === 'city' 
      || e.target.name === 'state' 
      || e.target.name === 'country' 
      || e.target.name === 'zipCode'
    ) {
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
      .then(newUser => onAddNewUser(newUser));
      
    e.target.reset();
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
          <input type="text" name="name" placeholder="Name" onChange = { handleChange }/>
          <input type="text" name="lastname" placeholder="Lastname" onChange = { handleChange } />
          <input type="text" name="street" placeholder="Street Address" onChange = { handleChange }/>
          <input type="text" name="city" placeholder="City" onChange = { handleChange }/>
          <input type="text" name="state" placeholder="State" onChange = { handleChange } />
          <input type="text" name="country" placeholder="Country" onChange = { handleChange }/>
          <input type="text" name="zipCode" placeholder="Zip-code" onChange = { handleChange }/>
          <input type="email" name="email" placeholder="Email" onChange = { handleChange }/>
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
    </div>
  );
}

export default IndividualExchange;






