import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import AirIcon from '@mui/icons-material/Air';
import SpeedIcon from '@mui/icons-material/Speed';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import 'weather-icons/css/weather-icons.css';


const ShowCard = ({ Info }) => {

    const { temp, temp_min, temp_max, pressure, humidity, country, sunrise, sunset, timezone, clouds, speed } = Info[0];
    const FullCity = Info[1];
    const [Dated, SetDated] = useState("");
    const [Time, SetTime] = useState("");
    const [Weather, StateWeather] = useState();


    const TimeChange = () => {
        var DateTime = new Date();
        var time = DateTime.toLocaleTimeString();
        var dated = DateTime.toLocaleDateString();
        SetTime(time);
        SetDated(dated)
    }
    setInterval(TimeChange, 1000);


    useEffect(() => {
        // console.log(Info);
        const { clouds } = Info[0];
        // console.log(clouds)
        // console.log(`${Info.clouds}`)
        if (clouds) {
            switch (clouds) {
                case "Haze":
                    StateWeather("wi-day-haze");
                    break;
                case "Clear":
                    StateWeather("wi-day-sunny");
                    break;
                case "Dust":
                    StateWeather("wi-day-fog");
                    break;
                case "Smoke":
                    StateWeather("wi-smog");
                    break;
                case "Clouds":
                    StateWeather("wi-day-cloudy-gusts");
                    break;
                case "Rain":
                    StateWeather("wi-rain-wind");
                    break;

                default:
                    break;
            }
        }
    }, [Info[0]]);


    return (
        <>
            <CardContent className="p-0 m-0">
                <Typography variant="h5" component="div" className="city-name">
                    <div className="row">
                        <div className="col-7  d-flex justify-content-center city ">
                            <p>{FullCity}<sub className="subname">{country}</sub></p>

                        </div>
                        <div className="col-5 icono">
                            <h1> <i className={`wi ${Weather}`}></i></h1>
                            <p className="text-center">{clouds}</p>

                        </div>
                    </div>
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" className="temp">
                    <div className="row">
                        <div className="col-6">
                            <div className="celsius d-flex align-items-center justify-content-center h-100">
                                <h1>{temp}<sup>o    <sub>C</sub></sup></h1>
                            </div>
                        </div>
                        <div className="col-6">
                            <h3>{Dated}</h3>
                            <h5>{Time}</h5>
                        </div>
                    </div>
                </Typography>
                <Typography variant="body2" className="extra border d-flex justify-content-center">
                    <div className="row">
                        <div className="col-3 d-flex mid ">
                            <AirIcon />
                            <div className="info">
                                <p className="word">Speed:</p>
                                <p className="ans">{speed}</p>
                            </div>
                        </div>
                        <div className="col-3 d-flex mid">
                            <SpeedIcon />
                            <div className="info">
                                <p className="word">Pressure:</p>
                                <p className="ans">{pressure}</p>
                            </div>
                        </div>
                        <div className="col-3 d-flex mid">
                            <Brightness5Icon />
                            <div className="info">
                                <p className="word">Humidity:</p>
                                <p className="ans">{humidity}</p>
                            </div>
                        </div>
                        <div className="col-3 d-flex justify-content-end" >
                            <div className="row">
                                <div className="col-12">

                                    <div className="info">
                                        <p className="word">Max_temp:</p>
                                        <p className="smallme ans">{temp_max}</p>
                                    </div>
                                </div>
                                <div className="col-12">

                                    <div className="info mt-3">
                                        <p className="word">Min_temp:</p>
                                        <p className="smallme ans">{temp_min}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Typography>
            </CardContent>
        </>
    )
}

export default ShowCard;
