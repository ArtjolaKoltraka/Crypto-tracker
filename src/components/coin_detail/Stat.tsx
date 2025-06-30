const Stat = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className=" text-black dark:text-gray-400">{label}</div>
    <div className="font-semibold  dark:text-white">{value}</div>
  </div>
);
export default Stat;
