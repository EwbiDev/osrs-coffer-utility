import { useEffect, useState } from "react";
import { getWikiPrices, WikiPriceItem } from "./utils/wikiPrices";

function App() {
  const [wikiPrices, setWikiPrices] = useState<WikiPriceItem[]>();

  useEffect(() => {
    async function updateInfo() {
      const wikiPrices = await getWikiPrices();
      if (!wikiPrices.error) {
        setWikiPrices(wikiPrices.data);
      }
    }
    updateInfo();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Wiki Prices</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Wiki ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">High</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">High Time</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Low</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Low Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {wikiPrices?.map((price) => (
              <tr key={price.wikiId} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{price.wikiId}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{price.high}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{price.highTime}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{price.low}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{price.lowTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;