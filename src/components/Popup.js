import React from "react";
import Typography from '@mui/material/Typography';


function Popup() {
  return (
    <div>

      <Typography variant="h6" component="h2">
            Your Random Secret Santa!
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Import Data Here.
      </Typography>

    </div>
    );
}

export default Popup;