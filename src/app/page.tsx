"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "./api/weatherApi";
import Navbar from "./components/Navbar";
import axios from "axios";

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
  console.log(data);
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
      </div>
    </>
  );
}
