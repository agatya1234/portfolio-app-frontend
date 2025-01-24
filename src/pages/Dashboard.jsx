import { useEffect, useState } from "react";
import { fetchStockData } from "../API/stockService";

export const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState({
    name: "",
    ticker: "",
    quantity: 1,
    buyPrice: "",
  });

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

  const handleBuyStock = (stock) => {
    setSelectedStock({
      name: stock.longName || "N/A",
      ticker: stock.symbol || "N/A",
      quantity: 1,
      buyPrice: stock.regularMarketPrice?.toFixed(2) || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedStock((prev) => ({ ...prev, [name]: value }));
  };

  if (loading)
    return (
      <div className="text-center text-white h-screen bg-gray-800 pt-80">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center h-screen mt-10 text-red-500">{error}</div>
    );

  return (
    <div className="p-6 bg-gray-800 text-white h-screen">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-200 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-right">Ticker</th>
              <th className="py-3 px-6 text-right">Price</th>
              <th className="py-3 px-6 text-right">Change</th>
              <th className="py-3 px-6 text-right">% Change</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm font-light">
            {stocks.map((stock, index) => (
              <tr
                key={index}
                className="border-b border-gray-700 hover:bg-gray-600"
              >
                <td className="py-3 px-6 text-left">
                  {stock.longName || "N/A"}
                </td>
                <td className="py-3 px-6 text-right">
                  {stock.symbol || "N/A"}
                </td>
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
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleBuyStock(stock)}
                    className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Buy Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              Add New Stock
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={selectedStock.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1">
                  Ticker
                </label>
                <input
                  type="text"
                  name="ticker"
                  value={selectedStock.ticker}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={selectedStock.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1">
                  Buy Price
                </label>
                <input
                  type="text"
                  name="buyPrice"
                  value={selectedStock.buyPrice}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-700"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                >
                  Add Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
