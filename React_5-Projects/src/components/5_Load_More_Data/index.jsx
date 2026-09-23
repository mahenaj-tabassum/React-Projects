import { useEffect, useState } from "react";
import LoadingComponent from "./LoadingComponent";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify";

const LoadMoreProduct = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const loading = products.length === 0;
  const disableButton = products.length >= 100;
  useEffect(() => {
    // Flag
    let cancelled = false;

    // Data fetching
    const fetchProducts = async () => {
      try {
        setLoadingMore(true);
        const response = await fetch(
          `https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch images.");
        }
        const result = await response.json();
        if (result && result.products && result.products.length && !cancelled) {
          setProducts((prev) => [...prev, ...result.products]);
        }
      } catch (err) {
        toast.error(`${err.message}`);
      } finally {
        if (!cancelled) {
          setLoadingMore(false);
        }
      }
    };

    fetchProducts();

    // Returning a anonymous function
    return () => {
      cancelled = true;
    };
  }, [count]);

  return (
    <div className="bg-[#12101A] min-h-screen px-10 py-15 text-[#EDEAF5] antialiased leading-relaxed">
      <h2 className="text-3xl font-black text-center">Load More Data Button</h2>
      <hr className="my-10 border-gray-600" />
      <div className="flex justify-between items-end mb-7 gap-3">
        <h2 className="font-medium text-[22px]">Products</h2>
        <span className="text-[13px] text-[rgba(237,234,245,.58)]"></span>
      </div>

      {/* Render Products Data */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading && <LoadingComponent />}
        {products && products.length ? (
          products.map((item) => (
            <div key={item.id}>
              <ProductCard item={item} />
            </div>
          ))
        ) : (
          <LoadingComponent />
        )}
      </div>

      <div className="flex justify-center py-10">
        <button
          disabled={disableButton || loadingMore}
          onClick={() => setCount((prev) => prev + 1)}
          className="rounded-xl cursor-pointer w-[50%] border border-[#8B5CF6]/20 bg-[#8B5CF6] px-6 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-[#9D72F7] disabled:cursor-not-allowed disabled:border-transparent disabled:bg-[#2E2942] disabled:text-[#EDEAF5]/40"
        >
          {loadingMore
            ? "Loading..."
            : disableButton
              ? "You have reached 100 products."
              : "Load more..."}
        </button>
      </div>
    </div>
  );
};

export default LoadMoreProduct;
