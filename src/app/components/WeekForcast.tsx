import React from "react";
import Container from "./Container";
import { ForcastWeatherDetails } from "../Props/weatherProps";
import { convertKelvinToCelsius } from "../utils/convertKelvinToCelsius";
import WeatherIcon from "./WeatherIcon";
import WeatherDetails from "./WeatherDetails";
import { BgContainer } from "../utils/bgContainer";
import getDayOrNightIcon from "../utils/getDayOrNightIcon";

const WeekForcast = (props: ForcastWeatherDetails) => {
  const {
    weatherIcon = "02d",
    date = "19.09",
    day = "Tuesday",
    temp,
    description = "",
    feels_like,
  } = props;

  return (
    <>
      <section className="flex w-full flex-col mb-10">
        <Container
          className={`gap-4 items-center shadow-black shadow-sm ${BgContainer(
            description
          )}`}
        >
          <section className="flex gap-4 items-center px-4">
            <div className="flex flex-col gap-1 items-center  ">
              <WeatherIcon
                iconName={getDayOrNightIcon(weatherIcon, "2025-02-04 12:00:00")}
              />
              <p>{date}</p>
              <p className="text-sm">{day}</p>
            </div>
            {/* Temperature and Description */}
            <div className="flex flex-col px-4 w-25 text-center ">
              <span className="text-5xl">
                {convertKelvinToCelsius(temp ?? 0)}°
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
                </p>
                <p className="capitalize text-lg">{description}</p>
              </span>
            </div>
          </section>
          {/* Weather Details */}
          <section className="flex px-6 gap-4 w-full justify-between overflow-x-auto p-6 pr-10 custom-scrollbar">
            <WeatherDetails {...props} />
          </section>
        </Container>
      </section>
    </>
  );
};

export default WeekForcast;
