import React, { useEffect, useState } from "react";
import {
  deleteStock,
  getPortfolioStocks,
  updateStock,
} from "../API/stockService";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PortfolioChart } from "../components/PortfolioChart";

export const Portfolio = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentStock, setCurrentStock] = useState(null);

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

  // useEffect(() => {
  //   const calculatePortfolioData = () => {
  //     let invested = 0;
  //     let current = 0;
  //     let pnlTotal = 0;
  //     let pnlToday = 0;

  //     userPortfolio.forEach((portfolioItem) => {
  //       const stock = stocks.find((s) => s.symbol === portfolioItem.symbol);
  //       if (stock) {
  //         const stockCurrentPrice = stock.regularMarketPrice;
  //         const stockChange = stock.regularMarketChange;

  //         invested += portfolioItem.invested;
  //         current += stockCurrentPrice * portfolioItem.quantity;
  //         pnlTotal +=
  //           stockCurrentPrice * portfolioItem.quantity - portfolioItem.invested;
  //         pnlToday += stockChange * portfolioItem.quantity;
  //       }
  //     });

  //     setPortfolioData({
  //       invested,
  //       current,
  //       pnlTotal,
  //       pnlToday,
  //     });
  //   };

  //   calculatePortfolioData();
  // }, [stocks]);

  const fetchPortfolioStocks = async () => {
    try {
      setLoading(true);
      const data = await getPortfolioStocks();
      setStocks(data.data);
      setLoading(false);
      toast.success("Stock Fetched successfully!");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch stocks!");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPortfolioStocks();
  }, []);

  const handleEdit = (stock) => {
    setCurrentStock(stock);
    setShowEditModal(true);
  };

  const handleDelete = (stock) => {
    setCurrentStock(stock);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      setStocks(stocks.filter((s) => s.ticker !== currentStock.ticker));
      const data = await deleteStock(currentStock._id);
      setShowDeleteConfirm(false);
      toast.success("Stock deleted successfully!");
      setCurrentStock(null);
    } catch (error) {
      toast.error("Failed to delete the stock!");
    }
  };

  const saveEdit = async () => {
    try {
      const data = await updateStock(currentStock._id, currentStock.quantity);
      setStocks(
        stocks.map((s) => (s.ticker === currentStock.ticker ? currentStock : s))
      );
      setShowEditModal(false);
      toast.success("Stock Updated successfully!");
      setCurrentStock(null);
    } catch (error) {
      toast.error("Failed to Update Successfully!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800 text-white">
        <ClipLoader color="#ffffff" size={50} />
      </div>
    );
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-800 text-white h-screen">
      {/* Portfolio */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="mb-6 p-6 flex gap-56 items-start bg-gray-800 rounded-lg">
        {/* Left Column: Values */}
        <div className="flex flex-col gap-4 w-1/3">
          <div className="px-4 py-2 border rounded-md shadow-md bg-gray-700">
            <div className="text-lg font-semibold text-white">
              Invested Total:
            </div>
            <div className="text-lg text-gray-300">
              ${portfolioData.invested.toFixed(2)}
            </div>
          </div>
          <div className="px-4 py-2 border rounded-md shadow-md bg-gray-700">
            <div className="text-lg font-semibold text-white">
              Current Value:
            </div>
            <div className="text-lg text-gray-300">
              ${portfolioData.current.toFixed(2)}
            </div>
          </div>
          <div className="px-4 py-2 border rounded-md shadow-md bg-gray-700">
            <div className="text-lg font-semibold text-white">Total P&L:</div>
            <div
              className={`text-lg ${
                portfolioData.pnlTotal >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              ${portfolioData.pnlTotal.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Right Column: Chart */}
        <PortfolioChart stocks={stocks} />
      </div>

      {/* Stock Holdings */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-200 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Stock Name</th>
              <th className="py-3 px-6 text-right">Ticker</th>
              <th className="py-3 px-6 text-right">Quantity</th>
              <th className="py-3 px-6 text-right">Buy Price</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm font-light">
            {stocks.map((stock, index) => (
              <tr
                key={index}
                className="border-b border-gray-700 hover:bg-gray-600"
              >
                <td className="py-3 px-6 text-left">{stock.name}</td>
                <td className="py-3 px-6 text-right">{stock.ticker}</td>
                <td className="py-3 px-6 text-right">{stock.quantity}</td>
                <td className="py-3 px-6 text-right">${stock.buyPrice}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                    onClick={() => handleEdit(stock)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    onClick={() => handleDelete(stock)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-full w-[400px]">
            <h3 className="text-xl font-bold mb-4">Edit Stock</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Stock Name
              </label>
              <input
                type="text"
                value={currentStock?.name}
                disabled
                className="w-full px-3 py-2 bg-gray-700 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Buy Price
              </label>
              <input
                disabled
                type="number"
                value={currentStock?.buyPrice}
                onChange={(e) =>
                  setCurrentStock({
                    ...currentStock,
                    buyPrice: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Quantity
              </label>
              <input
                type="number"
                min={1}
                value={currentStock?.quantity}
                onChange={(e) =>
                  setCurrentStock({
                    ...currentStock,
                    quantity: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={saveEdit}
              >
                Save
              </button>
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              Are you sure you want to delete {currentStock?.ticker}?
            </h3>
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
