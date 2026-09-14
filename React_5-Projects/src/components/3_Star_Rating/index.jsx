import { StarIcon } from "lucide-react";
import { useState } from "react";

const StarRating = ({ numOfStars = 8 }) => {
  // `rating` stores the star that the user has permanently selected.
  const [rating, setRating] = useState(0);

  // `hover` temporarily stores the star currently under the mouse.
  const [hover, setHover] = useState(0);

  // Called when the user clicks a star.
  const handleClick = (getCurrentIndex) => {
    setRating(getCurrentIndex);
  };

  // Called when the mouse enters a star.
  const handleMouseEnter = (getCurrentIndex) => {
    setHover(getCurrentIndex);
  };

  // When the mouse leaves a star, restore the hover state
  // to the user's actual selected rating.
  const handleMouseLeave = () => {
    setHover(rating);
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen bg-[#1A1A1A] text-[#F5F5F5]">
      <div className="bg-[#2A2A2A] flex gap-5 px-8 py-5 rounded">
        {/* 
          Create an array with `numOfStars` empty elements.

          Example:
          numOfStars = 5
          [...Array(5)] → [undefined, undefined, undefined, undefined, undefined]

          We use `map()` to create one StarIcon for each element.
        */}
        {[...Array(numOfStars)].map((_, index) => {
          /*
            Array indexes start from 0:

            0 → first star
            1 → second star
            2 → third star

            But our rating should be:

            1 → first star
            2 → second star
            3 → third star

            So we increase the index by 1.
          */
          index += 1;
          return (
            <StarIcon
              /*
                `hover || rating`

                If `hover` has a value, use hover.
                Otherwise, use the selected rating.

                Example:
                rating = 3
                hover = 5

                hover || rating → 5

                So 5 stars will be highlighted while hovering.
              */
              // Highlight the current star and all stars before it
              // Example: if hover = 3, stars 1, 2, and 3 will be highlighted
              className={`cursor-pointer ${index <= (hover || rating) ? "text-yellow-400 fill-yellow-400" : "fill-pink-600"}`}
              key={index}
              size={40}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>
      <h1 className="text-3xl">Rating: {rating}</h1>
    </div>
  );
};

export default StarRating;
