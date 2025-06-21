import axios from "axios";

// Raw CoinLore coin type
export interface CoinLoreCoin {
  id?: string;
  symbol?: string;
  name?: string;
  price_usd?: string;
  percent_change_24h?: string;
  market_cap_usd?: string;
}

// The response shape for paged tickers
export interface TickersResponse {
  data: CoinLoreCoin[];
  info: { coins_num: number; time: number };
}

export const fetchMarketData = async (): Promise<{
  coins: CoinLoreCoin[];
  total: number;
}> => {
  const { data } = await axios.get<TickersResponse>(
    "https://api.coinlore.net/api/tickers/",
    { params: { start: 0, limit: 95 } }
  );
  return { coins: data.data, total: data.data.length };
};

export const fetchCoinsByIds = async (
  ids: string[]
): Promise<CoinLoreCoin[]> => {
  if (!ids.length) return [];
  const { data } = await axios.get<CoinLoreCoin[]>(
    "https://api.coinlore.net/api/ticker/",
    { params: { id: ids.join(",") } }
  );
  return data;
};
