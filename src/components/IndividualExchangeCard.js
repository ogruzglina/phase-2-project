import { Button,Card, CardContent, CardMedia, CardActions,  Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";



function IndividualExchangeCard() {

  return (
    <div>
        <Grid container justifyContent="center" spacing={5}>
            <Grid item >
                <Card variant="outlined" sx={{ maxWidth: 500 }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image="https://media.istockphoto.com/vectors/concept-with-secret-santa-vector-id1064095906?k=20&m=1064095906&s=612x612&w=0&h=eG4UE_gl92sz7fJQS5EVCs77RkPMnmbtOsPiBoahz8Y="
                        // image="https://www.lawlessfrench.com/wp-content/uploads/present-participle-as-adjective.jpg"
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

                    <CardActions justifyContent="center">
                            <Link to="/individual-exchange"> Individual Exchange </Link>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item >
            <Card variant="outlined" sx={{ maxWidth: 500 }}>
                    <CardMedia
                        component="img"
                        height="200"
                        width='100%'
                        // image="https://www.creativefabrica.com/wp-content/uploads/2021/03/15/pile-of-gifts-Graphics-9608894-1.jpg"
                        image="https://edtech4beginnerscom.files.wordpress.com/2017/10/490989713-e1508467778912.jpg"
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
                            <Link to="/group-exchange"> Group Exchange </Link>
                            {/* Uses a button for the group instead of the link  */}
                            <Button size="small"><Link to="/group-exchange"></Link>Group</Button>
                    </CardActions>
                </Card>

            </Grid>

        </Grid>


   
    </div>
    );
}

export default IndividualExchangeCard;