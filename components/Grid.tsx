"use client";

import React, { useState } from "react";
import Cell from "./Cell";
import NumbersPad from "./NumbersPad";
import { SudokuSolver } from "@/lib/sudokuSolver";

export default function Grid({ puzzleString }: { puzzleString: string }) {
  // states to manage
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); //  the selected cell (primarily for cell highlighting)
  const [inputStatus, setInputStatus] = useState<boolean | null>(null); // instant feedback to the player

  // convert the puzzle string (81-char) into an array of number
  const initialCellsArray = puzzleString
    .split("")
    .map((c) => (c === "0" ? 0 : Number(c)));

  // store the initial cells array as a reference to lock the original puzzle cells
  const [originalCells] = useState(initialCellsArray);

  // store the input status of each cell
  const [errors, setErrors] = useState<(boolean | null)[]>(
    Array(81).fill(null),
  );

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

    // solver instance
    const sudokuSolver = new SudokuSolver();

    // update the cells array
    setCells((prev) => {
      // create a copy of the previous array to maintain immutability
      const cellsClone = [...prev];

      // validate the input
      const isValid = sudokuSolver.checkFlatPlacement(
        cellsClone,
        selectedIndex,
        value,
      );

      // update the UI states with the status
      setInputStatus(isValid);
      setErrors((prevErrors) => {
        // clone the errors state
        const newErrorsState = [...prevErrors];

        // update the state of the updated cell
        newErrorsState[selectedIndex] = isValid; // store true (green) or false (red)

        // return the new array to trigger a re-render of the board
        return newErrorsState;
      });

      // update the array with the specific index with the new value
      cellsClone[selectedIndex] = value;

      // TODO: store the array in the localstorage
      localStorage.setItem("us", JSON.stringify(cellsClone));

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

      // clean the UI
      setInputStatus(null);
      setErrors((prevErrors) => {
        // clone the errors state
        const newErrorsState = [...prevErrors];

        // update the state of the updated cell
        newErrorsState[selectedIndex] = null; // store null

        // return the new array to trigger a re-render of the board
        return newErrorsState;
      });

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
              cellId={index} // the cell index
              selectedIndex={selectedIndex} // current selected index
              setSelectedIndex={() => setSelectedIndex(index)} // on click set the selected index
              isOriginalCell={originalCells[index] !== 0} // true if the cell was part of the original puzzle
              inputStatus={errors[index]} // pass the inputStatus to the cell that is currently selected from the UI state
            />
          );
        })}
      </div>

      {/* numbers pad */}
      <NumbersPad onNumberClick={handleNumberClick} onClear={handleClear} />
    </div>
  );
}
