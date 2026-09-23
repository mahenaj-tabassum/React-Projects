// import Accordion from "./components/1_Accordion";
// import Random_Color_Generator from "./components/2_Random_Color_Generator";
// import StarRating from "./components/3_Star_Rating";
// import ImageSlider from "./components/4_Image_Slider";
import { ToastContainer } from "react-toastify";
import LoadMoreProduct from "./components/5_Load_More_Data";

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <ToastContainer position="top-right" />
      {/* Accordion Component */}
      {/* <Accordion /> */}

      {/* Random Color Generator */}
      {/* <Random_Color_Generator /> */}

      {/* Star Rating */}
      {/* <StarRating /> */}

      {/* Image Slider */}
      {/* <ImageSlider
        url={"https://picsum.photos/v2/list"}
        limit={"10"}
        page={"1"}
      /> */}

      <LoadMoreProduct />
    </div>
  );
};

export default App;
