import axios from "axios";

export async function getOfficialPrices() {
  try {
    const response = await axios.get(
      "http://localhost:5001/api/official_prices"
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
