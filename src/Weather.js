import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Input from '@mui/material/Input';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Weather() {
    const [nameState, changeNew] = useState(null);
    const [storeName, Statestorename] = useState("Kathmandu");


    const [Nocross, Cross] = useState(true);


    useEffect(() => {
        const FetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${storeName}&appid=a5df625540db717fec0e33cbc115d17b`
            const response = await fetch(url);   //get datas
            console.log(response);
            const resJson = await response.json();      //datras extracted converted into json pattern
            console.log(resJson);
            changeNew(resJson);
        }
        FetchApi();
    }, [storeName])

    const Callname = (events) => {
        Statestorename(events.target.value);
        console.log(events.target.value);

        Cross(false);
    }

    const removeAll = () => {
        Statestorename("");
        Cross(true);
    }
    return (
        <>
            <Card sx={{ maxWidth: 360 }}>
                <CardActionArea>
                    <Input
                        type="text"
                        placeholder="Enter a name of city"
                        onChange={Callname}

                    />

                    {!Nocross ? <Button component="span" variant="contained"><CancelIcon onClick={removeAll} /></Button> : null}




                    {
                        !nameState ? (
                            <p>No Data Found</p>
                        ) : (
                            <>
                                <CardContent>
                                    <Typography component={'div'} gutterBottom variant="h5">
                                        {storeName}
                                    </Typography>
                                    <Typography component={'div'} variant="body2" color="text.secondary">
                                        <div className="temp">
                                            {nameState.temp},{nameState.country}
                                        </div>
                                    </Typography>
                                    <Typography component={'div'} variant="body3" color="text.secondary">
                                        <div className="minmax">
                                            <p>max-temp: {nameState.main.temp_max}</p>
                                            <p>min-temp: {nameState.temp_min}</p>
                                        </div>
                                    </Typography>
                                </CardContent>
                            </>
                        )
                    }
                </CardActionArea>
            </Card>
        </>


    )
}

