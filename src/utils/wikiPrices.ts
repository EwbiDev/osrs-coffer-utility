import axios from "axios";

const USER_AGENT = import.meta.env.VITE_USER_AGENT;

const headers = {
  "User-Agent": USER_AGENT,
};

export type WikiPriceItem = {
  high: number;
  highTime: number;
  low: number;
  lowTime: number;
};

export type WikiPriceData = Record<string, WikiPriceItem>;

export type WikiPriceDataResponse = {
  data: WikiPriceData;
  error?: unknown;
};

export async function getWikiPrices(): Promise<WikiPriceDataResponse> {
  try {
    const response = await axios.get(
      "https://prices.runescape.wiki/api/v1/osrs/latest",
      { headers }
    );
    return response.data;
  } catch (error) {
    return {
      data: {},
      error,
    };
  }
}
