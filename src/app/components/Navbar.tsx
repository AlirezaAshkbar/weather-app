"use client";
import React, { useState } from "react";
import { MdWbSunny, MdMyLocation, MdOutlineLocationOn } from "react-icons/md";
import SearchBox from "./SearchBox";
import axios from "axios";
import { loadingCityAtom, placeAtom } from "../atom";
import { useAtom } from "jotai";

export default function Navbar() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(loadingCityAtom);

  // 🔹 Fetch city suggestions
  async function handleInputchange(value: string) {
    setCity(value);
    setShowSuggestions(false);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );

        const fetchedSuggestions = response.data.map((item: any) => item.name); // ✅ Fix API response
        setSuggestions(fetchedSuggestions);
        setShowSuggestions(true);
        setError("");
      } catch (error) {
        setError("Error fetching locations");
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }

  // 🔹 Handle city selection from suggestions
  function handleSuggestionClick(value: string) {
    setCity(value);
    setPlace(value); // ✅ Ensure `placeAtom` updates
    setShowSuggestions(false);
  }

  // 🔹 Handle form submission
  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true);
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a location");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city); // ✅ Ensure search updates `placeAtom`
        setShowSuggestions(false);
      }, 500);
    }
  }

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <div className="flex items-center gap-2">
          <h2 className="text-gray-500 text-3xl">Weather</h2>
          <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
        </div>
        <section className="flex gap-2 items-center">
          <MdMyLocation className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
          <MdOutlineLocationOn className="text-3xl" />
          <p className="text-slate-900/80 text-sm">{place}</p>
          <div className="relative">
            <SearchBox
              onsubmit={handleSubmitSearch}
              value={city}
              onchange={(e) => handleInputchange(e.target.value)}
            />
            <SuggestionsBox
              {...{
                showSuggestions,
                suggestions,
                handleSuggestionClick,
                error,
              }}
            />
          </div>
        </section>
      </div>
    </nav>
  );
}

// 🔹 Suggestions Box Component
function SuggestionsBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {(showSuggestions || error) && (
        <ul className="absolute bg-white border border-gray-300 rounded-md min-w-[200px] top-[44px] left-0 py-2 px-2 shadow-md">
          {error && <li className="text-red-500 p-1">{error}</li>}
          {suggestions.map((item, i) => (
            <li
              key={i}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
              onClick={() => handleSuggestionClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
