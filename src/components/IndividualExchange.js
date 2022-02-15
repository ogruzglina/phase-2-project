 import React, { useState } from "react";

// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';

function IndividualExchange() {
  const priceRenge = [[0,30], [31, 60], [61, 100], [100, 150], [151, 250], [251, 400], [401,1000]];
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
      max: 30,
    },
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      address:{[e.target.name] : e.target.value},
    });
  }
  console.log(formData);

  function handleSubmit (e) {
    e.preventDefault();

  }

  const options = priceRenge.map( price => 
    <option key = { price } >$ { price[0] } - $ { price[1] }</option>
  );

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
          <input type="text" name="zipcode" placeholder="Zip-code" onChange = { handleChange }/>
          <input type="email" name="email" placeholder="Email" onChange = { handleChange }/>
          <br></br>
          <input type="radio" name="randomGift" value="randomGift" onChange = { handleChange }/>
          <label for="html">Random gift</label>
          <input type="radio" name="wishlist" value="wishlist" onChange = { handleChange }/>
          <label for="html">Wish list</label>
          <br></br>
          {/* show it if wishlist was chosen */}
          <input type="text" name="wishlist" placeholder="Wish list" onChange = { handleChange }/>
          <label> Gift price renge
            <select name="priceRenge" value ='!!!put here form.data!!!'  onChange={ handleChange }>
              { options }
            </select>
          </label>
        </div>

        <button type="submit">
          Submit  {/*  need a name for this btn */}
        </button>
      </form>
    </div>
  );
}

export default IndividualExchange;






