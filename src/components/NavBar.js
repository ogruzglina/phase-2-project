import React, {useState} from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function NavBar() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);

  return( 
    <div>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}> 
        <Tabs value={value} onChange={handleChange} centered>
        <Tab value={0} label="Home" to="/" exact="true" component={Link} exact="true"/>
          <Tab value={1} label="Individual Exchange" to="/individual-exchange" component={Link} />
          <Tab value={2} label="Group Exchange" to="/group-exchange" component={Link} />
        </Tabs>
      </Box>
    </div>
  );
}

export default NavBar;