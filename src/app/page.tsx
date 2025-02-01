"use client";
import { weatherApi } from "./api/weatherApi";
import Navbar from "./components/Navbar";
import TodayData from "./components/TodayData";
import useFetch from "./hooks/useFetch";
import { WeatherApiResponse } from "./Props/weatherProps";

export default function Home() {
  const { data, isPending } = useFetch<WeatherApiResponse>(weatherApi);
  const firstData = data?.list[0];
  console.log(data);
  console.log(firstData);
  if (isPending)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  return (
    <>
      <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
        <Navbar />
        <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb10 pt-4">
          {/* to day data */}
          <section>
            <TodayData api={weatherApi} />
          </section>
        </main>
      </div>
    </>
  );
}
