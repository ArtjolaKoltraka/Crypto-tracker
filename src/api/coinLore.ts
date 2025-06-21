import axios from "axios";
import { coinLoreCoinSchema, tickersResponseSchema } from "../utils/validators";
import z from "zod";

export interface CoinLoreProps {
  id?: string;
  symbol?: string;
  name?: string;
  price_usd?: string;
  percent_change_24h?: string;
  market_cap_usd?: string;
}

export interface TickersResponse {
  data: CoinLoreProps[];
  info: { coins_num: number; time: number };
}

export const fetchMarketData = async (): Promise<{
  coins: CoinLoreProps[];
  total: number;
}> => {
  const { data } = await axios.get<TickersResponse>(
    "https://api.coinlore.net/api/tickers/",
    { params: { start: 0, limit: 95 } }
  );
  const parsed = tickersResponseSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Zod validation error:", parsed.error.format());
    throw new Error("Invalid API response structure");
  }
  return { coins: parsed.data.data, total: parsed.data.info.coins_num };
};

export const fetchCoinsByIds = async (
  ids: string[]
): Promise<CoinLoreProps[]> => {
  if (!ids.length) return [];
  const { data } = await axios.get<CoinLoreProps[]>(
    "https://api.coinlore.net/api/ticker/",
    { params: { id: ids.join(",") } }
  );
  const coinArraySchema = z.array(coinLoreCoinSchema);
  const parsed = coinArraySchema.safeParse(data);
  if (!parsed.success) {
    console.error(parsed.error.format());
    throw new Error("Invalid coins data");
  }
  return parsed.data;
};
