import { z } from "zod";

export const coinLoreCoinSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  price_usd: z.string(),
  percent_change_24h: z.string(),
  market_cap_usd: z.string(),
});

export const tickersResponseSchema = z.object({
  data: z.array(coinLoreCoinSchema),
  info: z.object({
    coins_num: z.number(),
    time: z.number(),
  }),
});

export type CoinLoreCoin = z.infer<typeof coinLoreCoinSchema>;
