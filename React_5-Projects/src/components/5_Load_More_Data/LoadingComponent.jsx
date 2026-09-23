const LoadingComponent = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="overflow-hidden rounded-3xl border border-[#2E2942] bg-[#1E1B2E] shadow-lg"
        >
          {/* Image */}
          <div className="aspect-4/2.5 w-full animate-pulse bg-[#2A2540]" />

          <div className="space-y-4 p-5">
            {/* Category */}
            <div className="h-3 w-20 animate-pulse rounded-full bg-[#2E2942]" />

            {/* Title */}
            <div className="h-6 w-4/5 animate-pulse rounded-md bg-[#35304A]" />

            {/* Description */}
            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-[#2E2942]" />
              <div className="h-3 w-3/4 animate-pulse rounded bg-[#2E2942]" />
            </div>

            {/* Price & Button */}
            <div className="flex items-center justify-between pt-3">
              <div className="h-5 w-16 animate-pulse rounded bg-[#3A3352]" />

              <div className="h-10 w-24 animate-pulse rounded-xl bg-[#8B5CF6]/40 border border-[#8B5CF6]/20" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LoadingComponent;
