import axios from 'axios';

const API_KEY = '6c21b45dfamsh91f8c98bdf201f5p1c0468jsne9f33172a860';

export const fetchStockData = async () => {
  const options = {
    method: 'GET',
    url: 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes',
    params: {
      ticker: 'AAPL,MSFT,^SPX,^NYA,GAZP.ME,SIBN.ME,GEECEE.NS',
    },
    headers: {
      'x-rapidapi-key': API_KEY,
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
