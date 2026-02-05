"use client";

import React, { useState } from "react";

export default function Cell({
  number,
  cellId,
  selectedIndex,
  setSelectedIndex,
}: {
  number: string;
  cellId: number;
  selectedIndex: number | null;
  setSelectedIndex: () => void;
}) {
  // get the cell coordinates
  const row = Math.floor(cellId / 9); // get the row index (0 -> 8), Math.floor(index / 9) converts a linear 0-80 index into a 0-8 row number
  const column = cellId % 9; // get the column index (0 -> 8)

  // custom border style based on the location (after each 3 cells)
  const rowStyle = row % 3 == 0 && row != 0 ? "border-t-4" : ""; // add the divider in the rows that are dividable by 3 and not the first row
  const columnStyle = column % 3 == 0 && column != 0 ? "border-l-4" : ""; // add the divider in the columns that are dividable by 3 and not the first column

  // cell highligh logic
  const isSelected = selectedIndex === cellId; // true if this specific cell is the one the user clicked
  const isSameRow =
    selectedIndex != null && row === Math.floor(selectedIndex / 9); // true if this cell shares the same horizontal row as the selection
  const isSameColumn = selectedIndex != null && column === selectedIndex % 9; // true if this cell shares the same vertical column as the selection

  return (
    <div
      className={`w-12 h-12 flex items-center justify-center border border-zinc-200 text-zinc-800 text-lg font-semibold cursor-pointer select-none ${rowStyle} ${columnStyle}  ${isSelected ? "bg-blue-300" : ""} ${!isSelected && (isSameRow || isSameColumn) ? "bg-blue-100" : ""}`}
      onClick={() => {
        // update state for the UI
        setSelectedIndex();
      }}
    >
      {number === "0" ? "" : number}
      {/* {`${row}${column}`} */}
    </div>
  );
}
