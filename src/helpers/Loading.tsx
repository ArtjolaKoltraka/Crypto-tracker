const Loading = () => {
  return (
    <div className="relative w-10 h-10">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="box-border absolute w-10 h-10 border-4 border-t-neutral-800 border-transparent rounded-full animate-loading-ring"
          style={{ animationDelay: `${-0.15 * (3 - i)}s` }}
        />
      ))}
    </div>
  );
};

export default Loading;
