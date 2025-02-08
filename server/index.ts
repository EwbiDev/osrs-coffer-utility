import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 5000;
const USER_AGENT = process.env.USER_AGENT || "No user agent set please complain to: https://github.com/EwbiDev/osrs-coffer-utility";

app.use(cors());
app.use(express.json());

// Example API Proxy Route
app.get("/api/wiki_prices", async (req, res) => {
  try {
    const response = await axios.get("https://prices.runescape.wiki/api/v1/osrs/latest", {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
