import React from "react";

function GroupExchange() {
  const priceRenge = [[0,30], [31, 60], [61, 100], [100, 150], [151, 250], [251, 400], [401,1000]];
  
  function handleChange () {

  }

  function handleSubmit () {

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
          <input type="email" name="email" placeholder="Email" onChange = { handleChange }/>
          <br></br>
          <label> Gift price renge
            <select name="priceRenge" value ='!!!put here form.data!!!' onChange={ handleChange }>
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

export default GroupExchange;