import React, { useState } from "react";

function IndividualExchange({ onAddNewUser, onFindSSanta }) {
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

  const priceRange = ['Choose a Price Range', [0,30], [31, 60], [61, 100], [100, 150], [151, 250], [251, 400], [401,1000]];
  const address = ['street', 'city', 'state', 'country', 'zipCode'];
  const options = priceRange.map( price =>  
    price === 'Choose a Price Range'
      ? <option key = { price } >{ price }</option>
      : <option key = { price } >$ { price[0] } - $ { price[1] }</option> 
  );

  const [ selectedPriceRange, setSelectedPriceRange] = useState('Choose a Price Range');
  const [ isWishList, setIsWishList] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  function handleChange(e) {
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

  function handleChangeRadio(e) {
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

  function handleSubmit(e) {
    e.preventDefault();
    addToDBandArr();

    e.target.reset();
    setFormData(defaultFormData)
  }

  let addToDBandArr = async () => {
    let req = await fetch('http://localhost:3000/participants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    let newUser = await req.json();
    onAddNewUser(newUser);
    onFindSSanta(newUser);
    return newUser
  }

  const showWishListFields = isWishList 
    ? <>
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
          <h2> Match with Another Santa: </h2>
      <form id="individualForm" onSubmit = { handleSubmit }>
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
            <input id="radio" type="radio" name="isRandomGift" value="randomGift" /> Random Gift
            <input id="radio1" type="radio" name="isRandomGift" value="wishlist" /> Create a wish list
          </div>
          {showWishListFields}
        </div>

        <button type="submit">
          Submit  
        </button>
      </form>
    </div>
  );
}

export default IndividualExchange;






