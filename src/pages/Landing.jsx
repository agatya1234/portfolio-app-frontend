import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/login"); // Replace '/login' with the route for your login/signup screen
  };
  return (
    <div className="bg-black h-screen p-6 text-white flex items-center justify-center">
      <div className="flex-col text-center">
        <div className="text-4xl font-extrabold">
          Track all your assets from one place
        </div>
        <div className="text-xl font-light mt-4">
          Real time data for Global Bank Accounts, Stocks, Investments, Crypto,
          DeFi, Physical Assests
        </div>
        <button
          className="mt-14 bg-white text-black border px-4 py-2 rounded-xl"
          onClick={handleNavigate}
        >
          Start Now
        </button>
        <img
          src="https://images.pexels.com/photos/11646613/pexels-photo-11646613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="max-h-sm max-w-2xl rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
          alt=""
        />
      </div>
    </div>
  );
};

export default Landing;
