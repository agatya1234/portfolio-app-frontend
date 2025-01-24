import React, { useEffect, useState } from "react";
import { fetchStockData } from "../API/stockService";

export const Portfolio = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample user portfolio data
  const userPortfolio = [
    { symbol: "AAPL", quantity: 10, invested: 2500 },
    { symbol: "GOOG", quantity: 5, invested: 5000 },
  ];

  const [portfolioData, setPortfolioData] = useState({
    invested: 0,
    current: 0,
    pnlTotal: 0,
    pnlToday: 0,
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
    // loadData();
  }, []);

  useEffect(() => {
    const calculatePortfolioData = () => {
      let invested = 0;
      let current = 0;
      let pnlTotal = 0;
      let pnlToday = 0;

      userPortfolio.forEach((portfolioItem) => {
        const stock = stocks.find((s) => s.symbol === portfolioItem.symbol);
        if (stock) {
          const stockCurrentPrice = stock.regularMarketPrice;
          const stockChange = stock.regularMarketChange;

          invested += portfolioItem.invested;
          current += stockCurrentPrice * portfolioItem.quantity;
          pnlTotal +=
            stockCurrentPrice * portfolioItem.quantity - portfolioItem.invested;
          pnlToday += stockChange * portfolioItem.quantity;
        }
      });

      setPortfolioData({
        invested,
        current,
        pnlTotal,
        pnlToday,
      });
    };

    calculatePortfolioData();
  }, [stocks]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-800 text-white h-screen">
      <h1 className="mb-6 italic underline">Portfolio :</h1>

      {/* Portfolio */}
      <div className="mb-6  p-2 flex justify-between items-center shadow-md">
        <div className="mb-4  px-4 py-2 border rounded-md shadow-md w-1/6">
          <div className="text-lg font-semibold">Invested Total:</div>
          <div className="text-lg">${portfolioData.invested.toFixed(2)}</div>
        </div>
        <div className=" mb-4 px-4 py-2 border rounded-md shadow-md w-1/6">
          <div className="text-lg font-semibold">Current Value:</div>
          <div className="text-lg">${portfolioData.current.toFixed(2)}</div>
        </div>
        <div className=" mb-4 px-4 py-2 border rounded-md shadow-md w-1/6">
          <div className="text-lg font-semibold">Total P&L:</div>
          <div
            className={`text-lg ${
              portfolioData.pnlTotal >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            ${portfolioData.pnlTotal.toFixed(2)}
          </div>
        </div>
        <div className=" mb-4 px-4 py-2 border rounded-md shadow-md w-1/6">
          <div className="text-lg font-semibold">P&L Today:</div>
          <div
            className={`text-lg ${
              portfolioData.pnlToday >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            ${portfolioData.pnlToday.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Stock List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-200 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Ticker</th>
              <th className="py-3 px-6 text-right">Invested Amount</th>
              <th className="py-3 px-6 text-right">Current Price</th>
              <th className="py-3 px-6 text-right">Change</th>
              <th className="py-3 px-6 text-right">% Change</th>
              <th className="py-3 px-6 text-right">P&L Today</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm font-light">
            {userPortfolio.map((portfolioItem, index) => {
              const stock = stocks.find(
                (s) => s.symbol === portfolioItem.symbol
              );
              if (!stock) return null;

              const stockCurrentPrice = stock.regularMarketPrice;
              const stockChange = stock.regularMarketChange;
              const stockChangePercent = stock.regularMarketChangePercent;

              return (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-600"
                >
                  <td className="py-3 px-6 text-left">
                    {portfolioItem.symbol}
                  </td>
                  <td className="py-3 px-6 text-right">
                    ${portfolioItem.invested.toFixed(2)}
                  </td>
                  <td className="py-3 px-6 text-right">
                    ${stockCurrentPrice.toFixed(2)}
                  </td>
                  <td
                    className={`py-3 px-6 text-right ${
                      stockChange < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    ${stockChange.toFixed(2)}
                  </td>
                  <td
                    className={`py-3 px-6 text-right ${
                      stockChangePercent < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {stockChangePercent.toFixed(2)}%
                  </td>
                  <td
                    className={`py-3 px-6 text-right ${
                      stockChange < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    ${stockChange * portfolioItem.quantity}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
