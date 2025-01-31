"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "./api/weatherApi";
import Navbar from "./components/Navbar";
import axios from "axios";
import { format, parseISO } from "date-fns";
import TodayData from "./components/TodayData";
import { convertKelvinToCelsius } from "./utils/convertKelvinToCelsius";

export default function Home() {
  const { isPending, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      try {
        const response = await axios.get(api);
        return response.data;
      } catch (err) {
        throw new Error("Failed to fetch data" + err);
      }
    },
  });
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
            <TodayData
              toDay={format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}
              temp={convertKelvinToCelsius(firstData?.main.temp ?? 0)}
            />
          </section>
        </main>
      </div>
    </>
  );
}
