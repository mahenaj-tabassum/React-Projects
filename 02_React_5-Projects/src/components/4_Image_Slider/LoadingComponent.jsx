const LoadingComponent = () => {
  return (
    <div className="flex items-center justify-center h-72">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin border-2 h-8 w-8 rounded-full border-[#D8F3DC]/20 border-t-[#D8F3DC]" />
        <p>Loading images...</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
