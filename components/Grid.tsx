"use client";

import React, { useState } from "react";
import Cell from "./Cell";
import NumbersPad from "./NumbersPad";

export default function Grid({ puzzleString }: { puzzleString: string }) {
  // state to manage the selected cell (primarily for cell highlighting)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // convert the puzzle string (81-char) into an array of number
  const initialCellsArray = puzzleString
    .split("")
    .map((c) => (c === "0" ? 0 : Number(c)));

  // store the initial cells array as a reference to lock the original puzzle cells
  const [originalCells] = useState(initialCellsArray);

  // set the cells to the initial cells
  const [cells, setCells] = useState<number[]>(initialCellsArray);

  // function to handle input from the numbers pad
  const handleNumberClick = (value: number) => {
    // safety check
    if (selectedIndex === null) return;

    // if the number is an original number do not change it
    if (originalCells[selectedIndex] != 0) {
      // do nothing
      return;
    }

    // update the cells array
    setCells((prev) => {
      // create a copy of the previous array to maintain immutability
      const cellsClone = [...prev];

      // update the specific index with the new digit
      // TODO: check if its valid input (not duplicated)
      cellsClone[selectedIndex] = value;

      // TODO: store the array in the localstorage

      // return the new array to trigger a re-render of the board
      return cellsClone;
    });
  };

  // function to handle erase
  const handleClear = () => {
    // safety check
    if (selectedIndex === null) return;

    // if the number is an original number do not change it
    if (originalCells[selectedIndex] != 0) {
      // do nothing
      return;
    }

    // update the cells array
    setCells((prev) => {
      // create a copy of the previous array to maintain immutability
      const cellsClone = [...prev];

      // update the specific index with 0
      cellsClone[selectedIndex] = 0;

      // return the new array to trigger a re-render of the board
      return cellsClone;
    });
  };
  return (
    // grid position container
    <div className="flex flex-col justify-center items-center gap-y-4">
      {/* grid contents container */}
      <div className="grid grid-cols-9 border-2 border-zinc-900 w-fit rounded-2xl">
        {cells.map((cellNumber, index) => {
          return (
            <Cell
              key={index} // unique ID
              number={cellNumber} // the puzzle number
              cellId={index} //the cell index
              selectedIndex={selectedIndex} // current selected index
              setSelectedIndex={() => setSelectedIndex(index)} // on click set the selected index
            />
          );
        })}
      </div>

      {/* numbers pad */}
      <NumbersPad onNumberClick={handleNumberClick} onClear={handleClear} />
    </div>
  );
}
