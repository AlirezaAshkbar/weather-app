export function BgContainer(desc: string) {
  switch (desc.toLowerCase()) {
    case "clear sky":
      return "bg-blue-300/80"; // Blue for clear sky
    case "few clouds":
    case "scattered clouds":
    case "broken clouds":
    case "overcast clouds":
      return "bg-gray-400/80"; // Gray for cloudy conditions
    case "shower rain":
    case "light rain":
    case "moderate rain":
    case "heavy rain":
      return "bg-blue-600/80"; // Darker blue for rain
    case "thunderstorm":
      return "bg-purple-800/80"; // Purple for thunderstorms
    case "snow":
      return "bg-white text-black"; // White background for snow
    case "mist":
    case "fog":
      return "bg-gray-300/80"; // Light gray for fog/mist
    default:
      return "bg-gray-200/80"; // Default background
  }
}
