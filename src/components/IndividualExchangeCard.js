import { Button,Card, CardContent, CardMedia, CardActions,  Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";



function IndividualExchangeCard() {

  return (
    <div>
        {/* Create card similar to the elfster card- has a link to the other 
            page, some image, and a subheading
        */}
        {/* Create json file with new data, then import each of the elements to make 
        the componenet dynamic
        */}
        {/* Then you can call the individual card and have it import the data*/}
        
        {/* <div id="card">
            <img id="card-image" src="" alt="Card image cap"></img>
            <div>
                <h2 >Card title</h2>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <Link to="/individualexchange"> Individual Exchange </Link>
            </div>
        </div> */}

        <Grid container>
            <Grid item >
                <Card sx={{ maxWidth: 350 }}>
                    <CardMedia
                        component="img"
                        height="350"
                        image="https://www.lawlessfrench.com/wp-content/uploads/present-participle-as-adjective.jpg"
                        alt="single present image"
                    />

                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Join Random Exchange 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                    </Typography>
                    </CardContent>

                    <CardActions>
                            <Link to="/individualexchange"> Individual Exchange </Link>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item >
            <Card sx={{ maxWidth: 350 }}>
                    <CardMedia
                        component="img"
                        height="350"
                        image="https://www.creativefabrica.com/wp-content/uploads/2021/03/15/pile-of-gifts-Graphics-9608894-1.jpg"
                        alt="group present image"
                    />

                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Join Group Exchange
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                    </Typography>
                    </CardContent>

                    <CardActions>
                            <Link to="/groupexchange"> Group Exchange </Link>
                            {/* Uses a button for the group instead of the link  */}
                            <Button size="small"><Link to="/groupexchange"></Link>Group</Button>
                    </CardActions>
                </Card>

            </Grid>

        </Grid>


   
    </div>
    );
}

export default IndividualExchangeCard;