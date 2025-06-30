import { z } from "zod";

export const coinMarketTableProps = z.object({
  name: z.string(),
  code: z.string().optional(),
  rate: z.number(),
  delta: z.object({ day: z.number() }),
  png64: z.string(),
  cap: z.number(),
});

export const coinOverview = z.object({
  cap: z.number(),
  volume: z.number(),
  btcDominance: z.number(),
  liquidity: z.number(),
});

export const coinHistoryEntrySchema = z.object({
  date: z.number(),
  rate: z.number(),
});

export type CoinHistoryEntry = z.infer<typeof coinHistoryEntrySchema>;
export type CoinOverviewProps = z.infer<typeof coinOverview>;
export const coinMarketListSchema = z.array(coinMarketTableProps);
