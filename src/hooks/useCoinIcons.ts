import { useState, useEffect } from "react";
import axios from "axios";

let iconsPromise: Promise<Record<string, string>> | null = null;

export default function useCoinIcons() {
  const [icons, setIcons] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    if (!iconsPromise) {
      iconsPromise = axios
        .get<{ Data: Record<string, { Symbol: string; ImageUrl: string }> }>(
          "https://min-api.cryptocompare.com/data/all/coinlist"
        )
        .then((res) => {
          const map: Record<string, string> = {};
          for (const info of Object.values(res.data.Data)) {
            map[
              info.Symbol.toLowerCase()
            ] = `https://www.cryptocompare.com${info.ImageUrl}`;
          }
          return map;
        })
        .catch((err) => {
          iconsPromise = null;
          throw err;
        });
    }

    iconsPromise
      .then((m) => setIcons(m))
      .catch((e) => setError(e as Error))
      .finally(() => setLoading(false));
  }, []);

  return { icons, loading, error };
}
