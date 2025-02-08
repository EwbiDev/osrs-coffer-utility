import { useEffect, useState } from "react";
import { getWikiPrices, WikiPriceData } from "./utils/wikiPrices";

function App() {
  const [wikiPrices, setWikiPrices] = useState<WikiPriceData>();

  useEffect(() => {
    async function updateInfo() {
      const wikiPrices = await getWikiPrices();
      if (!wikiPrices.error) {
        setWikiPrices(wikiPrices.data);
      }
    }
    updateInfo();
  }, []);

  console.log(wikiPrices);

  return <></>;
}

export default App;
