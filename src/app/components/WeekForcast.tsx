import React, { useState } from "react";
import Container from "./Container";
import WeatherIcon from "./WeatherIcon";
import WeatherDetails from "./WeatherDetails";
import { BgContainer } from "../utils/bgContainer";
import getDayOrNightIcon from "../utils/getDayOrNightIcon";
import { convertKelvinToCelsius } from "../utils/convertKelvinToCelsius";
import WeatherModal from "./WeatherModal";
import { ForcastWeatherDetails } from "../Props/weatherProps";

const WeekForcast = (props: ForcastWeatherDetails) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] =
    useState<ForcastWeatherDetails | null>(null);

  const {
    weatherIcon = "02d",
    date = "19.09",
    day = "Tuesday",
    temp,
    description = "",
    feels_like,
  } = props;

  const handleDetailsClick = () => {
    setSelectedDetails(props); // Set the current day's details
    setModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setModalOpen(false); // Close the modal
    setSelectedDetails(null);
  };

  return (
    <>
      <section className="flex w-full flex-col mb-10">
        <Container
          className={`gap-4 items-center shadow-black shadow-sm ${BgContainer(
            description
          )}`}
          onClick={handleDetailsClick} // Add click event to open modal
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

      {/* Weather Modal */}
      <WeatherModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        details={selectedDetails ?? undefined}
      />
    </>
  );
};

export default WeekForcast;
