import { useEffect, useState } from "react";
import { getWikiPrices, WikiPriceData } from "./utils/wikiPrices";
import { getOfficialPrices, OfficialItemPrice } from "./utils/officialPrices";

function App() {
  const [wikiPrices, setWikiPrices] = useState<WikiPriceData>();
  const [officialPrices, setOfficialPrices] = useState<OfficialItemPrice[]>();
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});

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

  let combinedPrices = officialPrices?.map((item) => {
    const wikiItem = wikiPrices?.data[item.id];
    const wikiHigh = wikiItem?.high || null;
    const difference = wikiHigh ? item.price - wikiHigh : null;
    const pricePercentage = wikiHigh ? ((item.price - wikiHigh) / wikiHigh) * 100 : null;
    
    return {
      ...item,
      wikiHigh,
      wikiLow: wikiItem?.low || null,
      difference,
      pricePercentage,
    };
  });

  combinedPrices = combinedPrices?.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const conditions = value.split(" ").filter(Boolean);
      return conditions.every((condition) => {
        if (condition.startsWith(">") || condition.startsWith("<")) {
          const numValue = Number(condition.slice(1));
          if (!isNaN(numValue)) {
            return condition.startsWith(">") ? item[key] > numValue : item[key] < numValue;
          }
        } else if (!isNaN(Number(condition))) {
          return item[key] === Number(condition);
        } else {
          return item[key]?.toString().toLowerCase().includes(condition.toLowerCase());
        }
        return true;
      });
    });
  });

  if (sortKey) {
    combinedPrices?.sort((a, b) => {
      const valA = a[sortKey] ?? 0;
      const valB = b[sortKey] ?? 0;
      return sortOrder === "asc" ? valA - valB : valB - valA;
    });
  }

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Prices</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {["name", "price", "limit", "volume", "wikiHigh", "wikiLow", "difference", "pricePercentage"].map((key) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-200"
                >
                  <div onClick={() => handleSort(key)}>
                    {key.charAt(0).toUpperCase() + key.slice(1)} {sortKey === key ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                  </div>
                  <input
                    type="text"
                    placeholder={isNaN(Number(combinedPrices?.[0]?.[key])) ? "Filter" : "e.g. >1 <99"}
                    value={filters[key] || ""}
                    onChange={(e) => handleFilterChange(key, e.target.value)}
                    className="mt-1 p-1 border rounded w-full"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {combinedPrices?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{item.price}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{item.limit}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{item.volume}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{item.wikiHigh}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{item.wikiLow}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{item.difference ?? "none"}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{item.pricePercentage !== null ? `${item.pricePercentage.toFixed(2)}%` : "none"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
