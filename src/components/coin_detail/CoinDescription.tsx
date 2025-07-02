import { useQuery } from "react-query";

interface CoinDescriptionProps {
  coinId: string;
}

const fetchCoinDescription = async (coinId: string): Promise<string> => {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
  if (!res.ok) throw new Error("Failed to fetch coin description");
  const data = await res.json();
  return data?.description?.en || "No description available.";
};

const CoinDescription = ({ coinId }: CoinDescriptionProps) => {
  const title =
    coinId && typeof coinId === "string"
      ? `What is ${coinId[0].toUpperCase() + coinId.slice(1)}?`
      : "Description";

  const { data: description } = useQuery({
    queryKey: ["coinDescription", coinId],
    queryFn: () => fetchCoinDescription(coinId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return (
    <div className="bg-container rounded-xl shadow-lg p-6 max-w-6xl mx-auto space-y-6 mt-8 mb-5">
      <h2 className="text-xl font-semibold">{title}</h2>

      {description ? (
        <p className="text-neutral-600 dark:text-gray-200 leading-relaxed text-sm whitespace-pre-wrap">
          {description}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default CoinDescription;
