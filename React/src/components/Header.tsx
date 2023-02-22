import {Grid} from "@mui/material";
import React from "react";

function Header() {
  return(
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <img src="./logo512.png" alt="logo" className="logo" />
        </Grid>
      </Grid>
    </>
  );
}
export default Header;