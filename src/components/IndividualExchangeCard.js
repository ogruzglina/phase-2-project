import { Button,Card, CardContent, CardMedia, CardActions,  Grid, Paper, Typography } from "@mui/material";
import React from "react";

function IndividualExchangeCard() {

  return (
    <div> 

    <h1>Exchange Rules</h1>
    <ul className="list">
        <li> Keep your match a secret; don't ruin the surprise! </li>
        <li> To exchange without a group: go to random exchange in order to be paired with someone</li>
        <li> To exchange with a group of friends, go to group exchange </li>
    </ul>

        <hr size="5" width="65%" color="lightblue" margin-top="50px" padding-bottom="20px"></hr>

        <Grid container justifyContent="center" spacing={5}>
            <Grid item >
                <Card variant="outlined" sx={{  maxWidth: 500 }}> 
                    <CardMedia
                        component="img"
                        height="200"
                        image="https://media.istockphoto.com/vectors/concept-with-secret-santa-vector-id1064095906?k=20&m=1064095906&s=612x612&w=0&h=eG4UE_gl92sz7fJQS5EVCs77RkPMnmbtOsPiBoahz8Y="
                        alt="single present image"
                    />

                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Join Random Exchange 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Swap with a stranger in order to exchange a gift one on one!
                    </Typography>
                    </CardContent>

                    <CardActions justifyContent="center">
                            <Button sx={{ml:12}} color="success" variant="contained" size="small" href="/individual-exchange">Individual Exchange</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item >
            <Card variant="outlined" sx={{ maxWidth: 500 }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image="https://edtech4beginnerscom.files.wordpress.com/2017/10/490989713-e1508467778912.jpg"
                        alt="group present image"
                    />

                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Join Group Exchange
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Swap between a group of friends to swap!
                    </Typography>
                    </CardContent>

                    <CardActions justifyContent="center">
                            <Button  sx={{ml:20}} color="success" variant="contained" size="small" href="/group-exchange">Group Exchange</Button>
                    </CardActions>
                </Card>

            </Grid>

        </Grid>

   
    </div>
    );
}

export default IndividualExchangeCard;