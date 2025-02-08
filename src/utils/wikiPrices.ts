import axios from "axios";

type WikiPriceResponse = {
  data: Record<string, {
    high: number;
    highTime: number;
    low: number;
    lowTime: number;
  }>;
};

export type WikiPriceItem = {
  id: number;
  high: number;
  highTime: number;
  low: number;
  lowTime: number;
};

export type WikiPriceData = {
  data: WikiPriceItem[];
  error?: unknown;
};

export async function getWikiPrices(): Promise<WikiPriceData> {
  try {
    const response = await axios.get<WikiPriceResponse>(
      "http://localhost:5001/api/wiki_prices"
    );

    const transformedData = Object.entries(response.data.data).map(([id, priceData]) => ({
      id: parseInt(id),
      high: priceData.high,
      highTime: priceData.highTime,
      low: priceData.low,
      lowTime: priceData.lowTime
    }));

    return {
      data: transformedData
    };
  } catch (error) {
    return {
      data: [],
      error
    };
  }
}