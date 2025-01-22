import { useEffect, useState } from "react";
import { fetchStockData } from "../API/stockService";

export const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStockData();
        console.log("API Response:", data.body);
        setStocks(data.body || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError("Failed to load stock data.");
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-800 text-white h-screen">
      <h1 className="mb-6 italic underline">Dashboard :</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-200 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Ticker</th>
              <th className="py-3 px-6 text-right">Price</th>
              <th className="py-3 px-6 text-right">Change</th>
              <th className="py-3 px-6 text-right">% Change</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm font-light">
            {stocks.map((stock, index) => (
              <tr
                key={index}
                className="border-b border-gray-700 hover:bg-gray-600"
              >
                <td className="py-3 px-6 text-left">{stock.symbol || "N/A"}</td>
                <td className="py-3 px-6 text-right">
                  ${stock.regularMarketPrice?.toFixed(2) || "N/A"}
                </td>
                <td
                  className={`py-3 px-6 text-right ${
                    stock.regularMarketChange < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {stock.regularMarketChange?.toFixed(2) || "N/A"}
                </td>
                <td
                  className={`py-3 px-6 text-right ${
                    stock.regularMarketChangePercent < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {stock.regularMarketChangePercent?.toFixed(2) || "N/A"}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
