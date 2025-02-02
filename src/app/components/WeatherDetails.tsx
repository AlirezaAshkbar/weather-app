import React from "react";
import { WeatherDetailsProps } from "../Props/weatherProps";
import SingleWeatherdetails from "./SingleWeatherdetails";
import { IoEyeOutline } from "react-icons/io5";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { LuSunrise, LuSunset } from "react-icons/lu";
import { ImMeter } from "react-icons/im";

const WeatherDetails = ({

  visability,
  humidity,
  airPressure,
  sunrise,
  sunset,
  windSpeed,    
}: WeatherDetailsProps) => {
return (
    <>
      <SingleWeatherdetails
        icon={<IoEyeOutline />}
        information="Visability"
        value={visability}
      />
      <SingleWeatherdetails
        icon={<FiDroplet />}
        information="Humidity"
        value={humidity}
      />
      <SingleWeatherdetails
        icon={<MdAir />}
        information="Wind Speed"
        value={windSpeed}
      />
      <SingleWeatherdetails
        icon={<ImMeter />}
        information="Air Pressure"
        value={airPressure}
      />
      <SingleWeatherdetails
        icon={<LuSunrise />}
        information="Sunrise"
        value={sunrise}
      />
      <SingleWeatherdetails
        icon={<LuSunset />}
        information="Sunset"
        value={sunset}
      />
    </>
  );
};

export default WeatherDetails;
