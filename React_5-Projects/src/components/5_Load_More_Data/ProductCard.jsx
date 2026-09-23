// Expects a dummyjson-shaped product object:
// { id, title, category, description, thumbnail, price, discountPercentage, ... }
const ProductCard = ({ item }) => {
  const { title, category, description, thumbnail, price, discountPercentage } = item;
  const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(2);

  return (
    <div className="overflow-hidden rounded-3xl border border-[#2E2942] bg-[#1E1B2E] shadow-lg">
      {/* Image */}
      <div className="aspect-4/2.5 bg-[#12101A] flex justify-center items-center w-full overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="space-y-4 p-5">
        {/* Category */}
        <span className="inline-block rounded-full bg-[#2E2942] px-3 py-1 text-xs uppercase tracking-wide text-[#EDEAF5]/60">
          {category}
        </span>

        {/* Title */}
        <h2 className="line-clamp-1 text-lg font-medium text-[#EDEAF5]">
          {title}
        </h2>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-[#EDEAF5]/55">
          {description}
        </p>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-3">
          <span className="text-lg font-semibold text-[#EDEAF5]">
            ${discountedPrice}
          </span>
          <button className="rounded-xl border border-[#8B5CF6]/20 bg-[#8B5CF6] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#9D72F7]">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;