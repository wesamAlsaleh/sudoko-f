import React from "react";
import Cell from "./Cell";

export default function Grid({ puzzleString }: { puzzleString: string }) {
  // convert the puzzle string (81-char) into an array
  const cellNumbers = puzzleString.split(""); // ["1", "2", ..., "81"]

  // console.log(cellNumbers);

  return (
    // grid position container
    <div className="flex justify-center items-center">
      {/* grid contents container */}
      <div className="grid grid-cols-9 border-2 border-zinc-900 w-fit">
        {cellNumbers.map((cellNumber, index) => {
          return <Cell key={index} number={cellNumber} />;
        })}
      </div>
    </div>
  );
}
