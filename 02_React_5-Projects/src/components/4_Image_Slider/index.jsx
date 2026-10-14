import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import LoadingComponent from "./LoadingComponent";
const ImageSlider = ({ url, limit = 1, page = 1 }) => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleRightButton = () => {
    if (currentSlide === images.length - 1) {
      setCurrentSlide(0);
      return;
    }
    setCurrentSlide(currentSlide + 1);
  };

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    const fetchImages = async () => {
      try {
        const response = await fetch(`${url}?page=${page}&limit=${limit}`);
        if (!response.ok) {
          throw new Error("Failed to fetch images.");
        }
        const data = await response.json();
        if (!cancelled) {
          setImages(data);
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMsg(error.message);
        }
      }
    };

    fetchImages();

    // Returning a anonymous function as a callback
    return () => {
      cancelled = true;
    };
  }, [url, page, limit]);

  const loading = images.length === 0 && !errorMsg;

  if (errorMsg !== null) {
    return <div>Error occurred! {errorMsg}</div>;
  }
  return (
    <section id="Image-Slider" className=" h-screen">
      <div className="flex gap-5 flex-col items-center justify-center h-screen bg-[#0F1A14] text-[#D8F3DC] p-6">
        <h1 className="font-bold text-3xl">Image Slider</h1>
        <div className="bg-[#17261D]/70 w-full max-w-xl px-8 py-5 rounded-3xl shadow-2xl shadow-black/40 p-6 backdrop:blur-md border border-[#17261D]">
          {loading && <LoadingComponent />}
          {errorMsg && <p>Error Occurred! {errorMsg}</p>}
          {!loading && !errorMsg && (
            <div>
              {images && images.length ? (
                <div className="relative overflow-hidden rounded-2xl mb-5 group">
                  <img
                    key={currentSlide}
                    className="w-full h-80 object-cover rounded-2xl transition-transform duration-500 ease-out group-hover:scale-105 animate-[fadein_0.4s_ease-out]"
                    src={images[currentSlide].download_url}
                    alt={`Slide ${currentSlide + 1}`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent rounded-2xl" />
                  <span className="absolute bottom-3 right-4 text-xs font-medium bg-black/40 backdrop:blur-sm px-2.5 py-1 rounded-full">
                    {currentSlide + 1}/{images.length}
                  </span>
                </div>
              ) : null}
              <div className="flex items-center justify-between px-1">
                <button
                  aria-label="Previous Image"
                  className="text-[#D8F3DC]/80 hover:text-white transition-colors duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                  onClick={() =>
                    setCurrentSlide((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1,
                    )
                  }
                >
                  <BsArrowLeftCircleFill className="size-9 drop-shadow-md" />
                </button>

                <span className="flex items-center gap-2">
                  {images && images.length
                    ? images.map((_, idx) => (
                        <button
                          onClick={() => setCurrentSlide(idx)}
                          key={idx}
                          className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${currentSlide === idx ? "w-6 bg-[#D8F3DC]" : "bg-[#D8F3DC]/30 hover:bg-[#D8F3DC]/50 w-2.5"}`}
                        ></button>
                      ))
                    : null}
                </span>

                <button
                  onClick={handleRightButton}
                  aria-label="Next image"
                  className="text-[#D8F3DC]/80 hover:text-white transition-colors duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <BsArrowRightCircleFill className="size-9 drop-shadow-md" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;
