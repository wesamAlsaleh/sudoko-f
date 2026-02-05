import React from "react";
import Cell from "./Cell";
import Box from "./Box";
import { log } from "console";

export default function Grid({ puzzleString }: { puzzleString: string }) {
  // define the grid sizes
  const GRID_SIZE = 9;
  const COLUMN_SIZE = 9;

  // convert the puzzle string (81-char) into an array
  const cellNumbers = puzzleString.split(""); // ["1", "2", ..., "81"]

  // console.log(cellNumbers);

  return (
    // grid container
    <div className="grid grid-cols-9 border-2 border-zinc-900 w-fit">
      {cellNumbers.map((cellNumber, index) => {
        return <Cell key={index} number={cellNumber} />;
      })}
    </div>
  );
}
