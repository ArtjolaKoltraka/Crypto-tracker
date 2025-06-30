import axios from "axios";
import {
  CoinHistoryEntry,
  coinHistoryEntrySchema,
  coinMarketListSchema,
  coinOverview,
  CoinOverviewProps,
} from "../utils/validators";
import z, { ZodError } from "zod";

export interface CoinMarketTableProps {
  name?: string;
  code?: string;
  rate?: number;
  delta?: { day: number };
  png64?: string;
  cap?: number;
}

export interface CoinDetailProps extends CoinMarketTableProps {
  rank?: number;
  volume?: number;
  circulatingSupply?: number;
  allTimeHighUSD?: number;
  totalSupply?: number;
  maxSupply?: number;
  delta?: {
    hour: number;
    day: number;
    week: number;
    month: number;
    quarter?: number;
    year?: number;
  };
  links?: {
    website: string;
  };
}

const HEADERS = {
  "content-type": "application/json",
  "x-api-key": process.env.REACT_APP_LCW_API_KEY!,
};

export const fetchMarketData = async (): Promise<{
  coins: CoinMarketTableProps[];
}> => {
  const res = await axios.post<CoinMarketTableProps[]>(
    "https://api.livecoinwatch.com/coins/list",
    {
      currency: "USD",
      sort: "rank",
      order: "ascending",
      offset: 0,
      limit: 100,
      meta: true,
    },
    {
      headers: HEADERS,
    }
  );
  try {
    const validated = coinMarketListSchema.parse(res.data);
    return { coins: validated };
  } catch (err) {
    if (err instanceof ZodError) {
      console.error("Zod validation failed:", err.errors);
    }
    return { coins: [] };
  }
};

export const fetchCoinsByIds = async (
  ids: string[]
): Promise<CoinMarketTableProps[]> => {
  if (ids.length === 0) return [];
  const codes = ids.map((c) => c.trim().toUpperCase());
  const res = await axios.post(
    "https://api.livecoinwatch.com/coins/map",
    {
      currency: "USD",
      codes,
      sort: "rank",
      order: "ascending",
      offset: 0,
      limit: 0,
      meta: true,
    },
    {
      headers: HEADERS,
    }
  );
  const validated = coinMarketListSchema.parse(res.data);
  return validated;
};

export async function fetchCoinDetail(
  code: string
): Promise<CoinDetailProps & { code: string }> {
  const res = await axios.post(
    "https://api.livecoinwatch.com/coins/single",
    { currency: "USD", code, meta: true },
    { headers: HEADERS }
  );

  return res.data;
}

export async function fetchCoinHistory(
  code: string,
  start: number,
  end: number
): Promise<CoinHistoryEntry[]> {
  const res = await axios.post(
    "https://api.livecoinwatch.com/coins/single/history",
    { currency: "USD", code, start, end, meta: true },
    { headers: HEADERS }
  );

  return z.array(coinHistoryEntrySchema).parse(res.data.history);
}

export async function fetchOverview(): Promise<CoinOverviewProps> {
  const res = await axios.post(
    "https://api.livecoinwatch.com/overview",
    { currency: "USD" },
    { headers: HEADERS }
  );

  return coinOverview.parse(res.data);
}
