import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetch = <T>(api: string) => {
  return useQuery<T>({
    queryKey: ["repoData", api],
    queryFn: async () => {
      try {
        const response = await axios.get(api);
        return response.data as T;
      } catch (err) {
        throw new Error("Failed to fetch data: " + err);
      }
    },
  });
};    

export default useFetch;
