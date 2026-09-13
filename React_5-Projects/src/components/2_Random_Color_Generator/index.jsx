import { useEffect, useState } from "react";

const Random_Color_Generator = () => {
  // State for type - HEX | RGB
  const [typeOfColor, setTypeOfColor] = useState("hex");

  // State for storing current color
  const [color, setColor] = useState("#1B1B2F");

  // CONCEPT: Reusable utility to get a random WHOLE number from 0 up to (but not including) "length".
  const randomColorUtility = (length) => {
    return Math.floor(Math.random() * length);
  };

  // Function for creating random color
  const handleCreateRandomHexColor = () => {
    const hexArray = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];
    let hexColor = "#";

    // CONCEPT: Accumulator pattern — hexColor is rebuilt each loop by appending ONE new
    // random hex digit to whatever it already holds. 6 iterations = 6 digits
    for (let i = 0; i < 6; i++) {
      hexColor = hexColor + hexArray[randomColorUtility(hexArray.length)];
    }
    setColor(hexColor);
  };

  const handleCreateRandomRGBColor = () => {
    const R = randomColorUtility(256);
    const G = randomColorUtility(256);
    const B = randomColorUtility(256);
    setColor(`rgb(${R},${G},${B})`);
  };
  // CONCEPT: This effect re-runs whenever "typeOfColor" changes, immediately generating
  // a matching color so the label ("Hex Color:"/"RGB Color:") never mismatches the value.
  // KNOWN ISSUE: calling setState (via the handlers) synchronously inside an effect causes
  // an extra "cascading" render — React recommends doing this directly in the button's
  // onClick instead, since the trigger (a click) is already known at that point and doesn't
  // need to be "reacted to" via an effect. Effects are meant for syncing with things outside
  // React (subscriptions, DOM, timers) — not for coordinating two pieces of your own state.
  useEffect(() => {
    if (typeOfColor === "rgb") handleCreateRandomRGBColor();
    else handleCreateRandomHexColor();
  }, [typeOfColor]);
  return (
    <div
      style={{ backgroundColor: color }}
      className={`gap-20 flex-col min-h-screen w-screen flex items-center justify-center text-[#C9B6E4]`}
    >
      <h1 className="bg-[#2e2e41]/60 backdrop-blur-2xl text-center px-5 py-4 rounded-lg text-6xl">
        {typeOfColor === "hex" ? "Hex Color:" : "RGB Color:"} {color}
      </h1>
      <div className="flex md:flex-row flex-col gap-5 items-center">
        <button
          onClick={() => setTypeOfColor("hex")}
          className="px-6 py-3 cursor-pointer rounded-lg font-medium bg-[#2A2A45] text-[#FF6B6B] border border-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-[#1B1B2F] transition-colors duration-200"
        >
          Create HEX Color
        </button>

        <button
          onClick={() => setTypeOfColor("rgb")}
          className="px-6 py-3 cursor-pointer rounded-lg font-medium bg-[#2A2A45] text-[#4ECDC4] border border-[#4ECDC4] hover:bg-[#4ECDC4] hover:text-[#1B1B2F] transition-colors duration-200"
        >
          Create RGB Color
        </button>

        <button
          onClick={
            typeOfColor === "hex"
              ? handleCreateRandomHexColor
              : handleCreateRandomRGBColor
          }
          className="px-6 py-3 cursor-pointer rounded-lg font-medium bg-[#2A2A45] text-[#FFD93D] border border-[#FFD93D] hover:bg-[#FFD93D] hover:text-[#1B1B2F] transition-colors duration-200"
        >
          Generate Random Color
        </button>
      </div>
    </div>
  );
};

export default Random_Color_Generator;
