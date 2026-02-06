"use client";

import React, { useState } from "react";
import Cell from "./Cell";

export default function Grid({ puzzleString }: { puzzleString: string }) {
  // state to manage the cell color
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // convert the puzzle string (81-char) into an array
  const cellNumbers = puzzleString.split(""); // ["1", "2", ..., "81"]

  // console.log(cellNumbers);

  return (
    // grid position container
    <div className="flex justify-center items-center">
      {/* grid contents container */}
      <div className="grid grid-cols-9 border-2 border-zinc-900 w-fit rounded-2xl">
        {cellNumbers.map((cellNumber, index) => {
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
    </div>
  );
}
