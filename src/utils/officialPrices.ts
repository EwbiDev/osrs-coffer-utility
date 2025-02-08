import axios from "axios";

export type OfficialItemPrice = {
  id: number;
  name: string;
  examine: string;
  members: boolean;
  lowalch: number;
  highalch: number;
  limit: number;
  value: number;
  icon: string;
  price: number;
  last: number;
  volume: number;
};

export type OfficialPriceData = {
  data: OfficialItemPrice[];
  error?: unknown;
};

export async function getOfficialPrices(): Promise<OfficialPriceData> {
  try {
    const response = await axios.get(
      "http://localhost:5001/api/official_prices"
    );

    const rawData = response.data;

    // Convert object to array, filtering out non-numeric keys
    const officialPrices: OfficialItemPrice[] = Object.keys(rawData)
      .filter((key) => !isNaN(Number(key))) // Ensure it's a numeric ID
      .map((key) => rawData[key] as OfficialItemPrice); // Convert each object

    return {
      data: officialPrices,
    };
  } catch (error) {
    return {
      data: [],
      error,
    };
  }
}
