import { useEffect, useState } from "react";
import { getWikiPrices, WikiPriceData } from "./utils/wikiPrices";
import { getOfficialPrices, OfficialItemPrice } from "./utils/officialPrices";

function App() {
  const [wikiPrices, setWikiPrices] = useState<WikiPriceData>();
  const [officialPrices, setOfficialPrices] = useState<OfficialItemPrice[]>();

  useEffect(() => {
    async function updateInfo() {
      const wikiPrices = await getWikiPrices();
      if (!wikiPrices.error) {
        setWikiPrices(wikiPrices);
      }

      const officialPrices = await getOfficialPrices();
      if (!officialPrices.error) {
        setOfficialPrices(officialPrices.data);
      }
    }
    updateInfo();
  }, []);

  let combinedPrices;

  if (officialPrices && wikiPrices) {
    combinedPrices = officialPrices?.map((item) => {
      const wikiItem = wikiPrices?.data[item.id];
      if (wikiItem) {
        return {
          ...item,
          wikiHigh: wikiItem.high,
          wikiLow: wikiItem.low,
        };
      }

      return {
        ...item,
        wikiHigh: null,
        wikiLow: null,
      };
    });
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Prices</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Limit
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Volume
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Wiki High
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Wiki Low
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Difference
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {combinedPrices?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {item.price}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {item.limit}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {item.volume}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {item.wikiHigh}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {item.wikiLow}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {item.wikiHigh ? item.price - item.wikiHigh : "none"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
