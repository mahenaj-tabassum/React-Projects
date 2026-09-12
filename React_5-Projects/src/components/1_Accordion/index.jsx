import { useState } from "react";
import data from "../1_Accordion/data.js";

const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);

  // concept: Store list of Opened accordion's id in array
  const [multiSelect, setMultiSelect] = useState([]);

  // Single Selection
  const handleSingleSelection = (getCurrentIdOfAccordionItem) => {
    // Concept: Clicking an already opened accordion closes it.
    setSelected(
      getCurrentIdOfAccordionItem === selected
        ? null
        : getCurrentIdOfAccordionItem,
    );
  };
  // Multiple Selection
  const handleMultipleSelection = (getCurrentId) => {
    // concept: When user click any particular item, we need to store that one in the array, until user click the same item , then we will remove the item
    // Concept: Create a copy of the state array instead of mutating the original.
    // React state should always be updated immutably.
    let copyOfMultiSelection = [...multiSelect];

    // Check the index of this 'getCurrentId' current id, if this id is already present in the array or not
    // If this id is already present, and user click the accordion again then we have to remove that accordion from the array
    // or else we will push new accordion to the array
    // Concept: Find the position of the clicked accordion's ID in the array.
    const findIndexOfCurrentId = copyOfMultiSelection.indexOf(getCurrentId);

    // Toggle the clicked accordion's id

    // Not in the array? Add it
    if (findIndexOfCurrentId === -1) copyOfMultiSelection.push(getCurrentId);
    // Already in the array? remove it
    else copyOfMultiSelection.splice(findIndexOfCurrentId, 1);

    setMultiSelect(copyOfMultiSelection);
  };

  const handleModeChange = () => {
    const nextMode = !enableMultiSelection;

    if (nextMode) {
      setSelected(null); // Going to Multi mode
    } else {
      setMultiSelect([]); // Going to Single mode
    }

    setEnableMultiSelection(nextMode);
  };

  return (
    <>
      {/* Single Selection Accordion */}

      <div className="min-h-screen w-screen py-8 flex flex-col items-center justify-center bg-gray-950 px-4">
        <div className="flex gap-5">
          <h2 className="text-3xl font-bold text-teal-400">Accordion</h2>
          <button
            onClick={handleModeChange}
            className={
              enableMultiSelection
                ? "rounded-full border border-yellow-400/40 bg-yellow-400/10 px-5 py-2.5 text-sm text-yellow-300 backdrop-blur-2xl transition-all active:scale-95 cursor-pointer"
                : "rounded-full border border-slate-700 bg-slate-800/60 px-5 py-2.5 text-sm text-slate-200 backdrop-blur-2xl transition-all hover:border-teal-400/40 hover:bg-teal-400/10 hover:text-teal-300 active:scale-95 cursor-pointer"
            }
          >
            {enableMultiSelection
              ? "Disable Multi Selection"
              : "Enable Multi Selection"}
          </button>
        </div>
        <div className="w-full mt-8 max-w-xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-black/40 backdrop:blur-lg">
          {
            //  Does data exist AND does it contain at least one item?
            data && data.length > 0 ? (
              data.map((dataItem, index) => {
                const isOpen = selected === dataItem.id;
                return (
                  <div
                    key={dataItem.id}
                    className={` ${index !== 0 ? "border-t border-slate-800" : ""}`}
                  >
                    {/* Title */}
                    <div
                      onClick={
                        enableMultiSelection
                          ? () => handleMultipleSelection(dataItem.id)
                          : () => handleSingleSelection(dataItem.id)
                      }
                      className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-colors hover:bg-slate-800/40"
                    >
                      <h3
                        className={`text-xl font-medium transition-colors 
                          ${isOpen ? "text-teal-300" : "text-white"}
                          `}
                      >
                        {dataItem.question}
                      </h3>
                      <span
                        className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "rotate-180 border-teal-400/40 bg-teal-400/10 text-teal-300"
                            : "border-slate-700 text-slate-400"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.148l3.71-3.918a.75.75 0 111.08 1.04l-4.24 4.48a.75.75 0 01-1.08 0l-4.24-4.48a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>

                    {enableMultiSelection
                      ? // Concept: If this accordion's ID is in the multiSelect array, show its answer. Otherwise, show nothing(&&)
                        // concept: `multiSelect` stores all the opened accordion's IDs
                        // concept: If the accordion's id is in the multiSelect array, its answer is shown (opened). If the id is not in the array, it stays closed.
                        // multiSelect: list of opened accordion id
                        multiSelect.includes(dataItem.id) && (
                          <div>
                            <p className="px-6 pb-5 text-lg leading-relaxed text-slate-300">
                              {dataItem.answer}
                            </p>
                          </div>
                        )
                      : selected === dataItem.id && (
                          <div>
                            <p className="px-6 pb-5 text-lg leading-relaxed text-slate-300">
                              {dataItem.answer}
                            </p>
                          </div>
                        )}
                    {/* {selected === dataItem.id || multiSelect.indexOf(dataItem.id) !== -1 ? (
                      <div>
                        <p className="px-6 pb-5 text-lg leading-relaxed text-slate-300">
                          {dataItem.answer}
                        </p>
                      </div>
                    ) : null} */}
                  </div>
                );
              })
            ) : (
              <div className="px-6 py-8 text-center text-slate-500">
                No data found
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Accordion;

/**
 * const [selected, setSelected] = useState(null);
 * selected is supposed to store
 * "which accordion item is selected",
 * not whether something is selected.
 * That's why we used `null` instead of false
 *
 * selected = null
 * means: Nothing is selected or opened yet
 *
 * selected = 2
 * means: Accordion item 2 is selected
 *
 * Why use useState()?
 * because `the selected accordion item can change when the use clicks another`
 *
 * When to use `useState()`?
 * => Ask yourself - Does this value need to change because of user interaction?
 * If yes → usually state.
 *
 * null = nothing is selected, there is no value
 * false = the `value` is no
 */

/**
 * ```
  function handleFunction() {
    console.log("Clicked!");
  }
  ```
  <button onClick={...}>Click me</button>
  ```
  1. onClick = {handleFunction} = "React, when the button is clicked, call this function."
  2. onClick = {()=>handleFunction(argument)} = the ()=> function says: "When you call me, I will call handleFunction()."
    React
      ↓
    gets () => handleFunction
      ↓
    waits for click
      ↓
    click happens
      ↓
    calls the arrow function
      ↓
    arrow function calls handleFunction()


  3. onClick = {handleFunction()} = The () means: Call this function now.
  * So React doesn't receive the function.
 */

/** concept - React Re-Render
 * When a state value changes, React usually re-render the component that owns that state
 * React runs the component again to figure out what the UI should look like with the new state.
 * Important: re-render ≠ entire page reload
 * re-render → does NOT necessarily mean every DOM element is changed.
 * React compares the new result with the previous result and updates the necessary DOM parts.
 */

/**
 * Click sequence

    * Start

      multiSelect = []

      All closed.

    * Click 1st Item (1)

      indexOf(1) = -1

      push(1)

      multiSelect = [1]

      React opens.

    * Click 2nd Item (2)

      indexOf(2) = -1

      push(2)

      multiSelect = [1, 2]

      1st and 2nd items are both open.

    * Click 1st item again (1)

      indexOf(1) = 0

      splice(0, 1)

      multiSelect = [2]

      React closes, JSX stays open.
*/
