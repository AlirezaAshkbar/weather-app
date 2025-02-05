export function BgContainer(desc: string) {
  switch (desc.toLowerCase()) {
    case "clear sky":
      return "bg-gradient-to-b from-blue-300 to-gray-200"; // Bright blue sky
    case "few clouds":
      return "bg-gradient-to-b from-blue-400 to-blue-200"; // Light clouds
    case "scattered clouds":
      return "bg-gradient-to-b from-gray-300 to-gray-100"; // Scattered clouds
    case "broken clouds":
    case "overcast clouds":
      return "bg-gradient-to-b from-gray-500 to-gray-300"; // Darker clouds
    case "shower rain":
    case "light rain":
    case "moderate rain":
    case "heavy rain":
      return "bg-gradient-to-b from-blue-600 to-gray-400"; // Rainy sky
    case "thunderstorm":
      return "bg-gradient-to-b from-gray-800 to-purple-700"; // Dark stormy clouds with purple tint
    case "snow":
      return "bg-gradient-to-b from-gray-100 to-white text-black"; // Snowy white
    case "mist":
    case "fog":
      return "bg-gradient-to-b from-gray-300 to-gray-100"; // Misty atmosphere
    default:
      return "bg-gray-200"; // Default neutral color
  }
}
