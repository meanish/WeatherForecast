import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import "./index.scss";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import "weather-icons/css/weather-icons.css";
import ShowCard from "./ShowCard";

export default function Updated() {
  const [City, StateCity] = useState("");
  const [FullCity, StateFullcity] = useState("Thimi");

  const [Info, SetInfo] = useState({});

  const [Nocross, Cross] = useState(true);
  const [Found, StateFound] = useState(true);

  const display = () => {
    StateFullcity(City);
    StateCity("");
    Cross(true);
  };

  useEffect(() => {
    const FetchApi = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${FullCity}&units=metric&appid=a5df625540db717fec0e33cbc115d17b`;
        const resp = await fetch(url);
        const resJson = await resp.json();
        // console.log(resJson);//

        // array destructuring

        const { temp, temp_min, temp_max, pressure, humidity } = resJson.main;
        const { country, sunrise, sunset } = resJson.sys;
        const { timezone } = resJson;
        const { speed } = resJson.wind;
        const { main: clouds } = resJson.weather[0]; //change name of main to cloud

        const Mydetail = {
          temp,
          temp_min,
          temp_max,
          pressure,
          humidity,
          country,
          sunrise,
          sunset,
          timezone,
          clouds,
          speed,
        };
        SetInfo(Mydetail);
        // console.log(Mydetail);
        StateFound(true);
        // console.log(Info);
      } catch (error) {
        StateFound(false);
      }
    };
    FetchApi();
  }, [FullCity]);

  const removeAll = () => {
    StateCity("");
    Cross(true);
  };

  return (
    <>
      <div className="card-only">
        <Card sx={{ minWidth: 405 }}>
          <CardContent className="m-0 card-content">
            {/* for input */}
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              className="d-flex search"
              gutterBottom
            >
              <input
                type="text"
                placeholder="Enter the name of city"
                value={City}
                className="typeme"
                onChange={(events) => {
                  StateCity(events.target.value);
                  Cross(false);
                }}
              />

              {!Nocross ? (
                <Button color="secondary" component="span">
                  <CancelIcon onClick={removeAll} />
                </Button>
              ) : null}
              <Button component="span" className="btn-click" onClick={display}>
                <SearchIcon />
              </Button>
            </Typography>

            {/* for data APOI */}
            {!Found ? (
              <CardContent>
                No City found. Please enter correct city name...
              </CardContent>
            ) : (
              <>
                <ShowCard Info={[Info, FullCity]} />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
