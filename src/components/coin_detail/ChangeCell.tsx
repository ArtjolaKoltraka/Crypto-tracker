const ChangeCell = ({
  label,
  rawValue,
}: {
  label: string;
  rawValue: number;
}) => {
  const value = (rawValue - 1) * 100;
  const isUp = value >= 0;
  const color = isUp ? "text-green-400" : "text-red-400";
  const arrow = isUp ? "▲" : "▼";

  return (
    <div>
      <div className="text-xs text-black dark:text-gray-400">{label}</div>
      <div className={`font-semibold ${color}`}>
        {Math.abs(value).toFixed(2)}% {arrow}
      </div>
    </div>
  );
};
export default ChangeCell;
