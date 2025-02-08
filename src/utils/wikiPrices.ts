import axios from "axios";

const USER_AGENT = import.meta.env.VITE_USER_AGENT;

const headers = {
  "User-Agent": USER_AGENT,
};

async function getWikiPrices() {
  try {
    const response = await axios.get(
      "https://prices.runescape.wiki/api/v1/osrs/latest",
      { headers }
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export default getWikiPrices;
