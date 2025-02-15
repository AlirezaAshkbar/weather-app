import React from "react";
import { motion } from "framer-motion";
import { ForcastWeatherDetails } from "../Props/weatherProps";
import WeatherIcon from "./WeatherIcon";
import { convertKelvinToCelsius } from "../utils/convertKelvinToCelsius";
import { BgContainer } from "../utils/bgContainer";
import { Droplets, Wind, Gauge, Sun, Moon, Eye } from "lucide-react";
import getDayOrNightIcon from "../utils/getDayOrNightIcon";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  details?: ForcastWeatherDetails;
};

const WeatherModal: React.FC<ModalProps> = ({ isOpen, onClose, details }) => {
  if (!isOpen || !details) return null;

  const {
    weatherIcon,
    date,
    day,
    temp,
    feels_like,
    description,
    humidity,
    windSpeed,
    airPressure,
    sunrise,
    sunset,
    visability,
  } = details;

  // Animation Variants
  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Close the modal if the backdrop is clicked
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close the modal if the backdrop itself is clicked (not the modal content)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 select-none"
      onClick={handleBackdropClick} // Attach click handler to the backdrop
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={`w-[90%] max-w-lg rounded-2xl shadow-2xl overflow-hidden ${BgContainer(
          description
        )}`}
      >
        {/* Header with Close Button */}
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white p-5 rounded-t-2xl">
          <h2 className="text-lg font-semibold">
            {day} - {date}
          </h2>
          <button
            onClick={onClose}
            className="text-white bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
          >
            ✖
          </button>
        </div>

        {/* Main Content */}
        <motion.div
          className="p-6 space-y-6"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
          <div className="flex flex-col items-center text-center">
            <WeatherIcon
              iconName={getDayOrNightIcon(
                weatherIcon ?? "",
                "2025-02-04 12:00:00"
              )}
              className="text-7xl mb-4"
            />
            <h3 className="capitalize text-2xl font-bold">{description}</h3>
            <p className="text-5xl font-extrabold mt-2">
              {convertKelvinToCelsius(temp)}°C
            </p>
            <p className="text-lg text-gray-700">
              Feels like {convertKelvinToCelsius(feels_like)}°C
            </p>
          </div>

          {/* Animated Weather Details */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.01,
                },
              },
            }}
          >
            {[ 
              {
                label: "Sunset",
                value: sunset ? sunset : "N/A",
                icon: <Moon size={28} />,
              },
              {
                label: "Sunrise",
                value: sunrise ? sunrise : "N/A",
                icon: <Sun size={28} />,
              },
              {
                label: "Wind Speed",
                value: `${windSpeed} km/h`,
                icon: <Wind size={28} />,
              },
              {
                label: "Humidity",
                value: `${humidity}%`,
                icon: <Droplets size={28} />,
              },
              {
                label: "Visiblity",
                value: visability ? visability : "N/A",
                icon: <Eye size={28} />,
              },
              {
                label: "Pressure",
                value: `${airPressure} hPa`,
                icon: <Gauge size={28} />,
              },
            ].map(({ label, value, icon }) => (
              <motion.div
                key={label}
                className="flex flex-col items-center  p-4 rounded-lg  transform hover:scale-105 transition duration-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="text-blue-600 mb-2">{icon}</div>
                <p className="text-sm font-semibold text-gray-700">{label}</p>
                <p className="text-lg font-bold">{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WeatherModal;
