import axios from "axios";

export type WikiPriceItem = {
  high: number;
  highTime: number;
  low: number;
  lowTime: number;
};

export type WikiPriceData = {
  data: Record<string, WikiPriceItem>;
  error?: unknown;
};

export async function getWikiPrices(): Promise<WikiPriceData> {
  try {
    const response = await axios.get("http://localhost:5001/api/wiki_prices");

    return {
      data: response.data.data,
    };
  } catch (error) {
    return {
      data: {},
      error,
    };
  }
}
