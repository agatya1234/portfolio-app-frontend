import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL;

const stocksURL = `${apiUrl}/stocks`;

export const fetchStockData = async () => {
  const options = {
    method: 'GET',
    url: 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes',
    params: {
      ticker: 'AAPL,MSFT,^SPX,^NYA,GAZP.ME,SIBN.ME,GEECEE.NS',
    },
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};


export const addStock = async (data) => {
  try {
    data = { ...data, userId: "678cefa384d63b30ca6b4300" }
    const response = await axios.post(stocksURL, data);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
}

export const getPortfolioStocks = async () => {
  try {
    const response = await axios.get(stocksURL)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const updateStock = async (id, quantity) => {
  try {
    const response = await axios.put(`${stocksURL}/${id}`, { quantity });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const deleteStock = async (id) => {
  try {
    const response = await axios.delete(`${stocksURL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
