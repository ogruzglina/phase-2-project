import React, {useState} from "react";
import { NavLink, Link } from "react-router-dom";
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
          <Tab label="Home" to="/" component={Link} />
          <Tab label="Individual Exchange" to="/individualexchange" component={Link} />
          <Tab label="Group Echange" to="/groupexchange" component={Link} />
        </Tabs>
      </Box>
    </div>
  );
}

export default NavBar;