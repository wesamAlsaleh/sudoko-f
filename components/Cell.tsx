"use client";

import React from "react";

export default function Cell({
  number,
  cellId,
}: {
  number: string;
  cellId: number;
}) {
  // get the cell coordinates
  const row = Math.floor(cellId / 9); // get the row index (0 -> 8)
  const column = cellId % 9; // get the column index (0 -> 8)

  // custom border style based on the location (after each 3 cells)
  const rowStyle = row % 3 == 0 && row != 0 ? "border-t-4" : ""; // add the divider in the rows that are dividable by 3 and not the first row
  const columnStyle = column % 3 == 0 && column != 0 ? "border-l-4" : ""; // add the divider in the columns that are dividable by 3 and not the first column

  return (
    <div
      className={`w-12 h-12 border border-zinc-200 flex items-center justify-center text-zinc-800 text-lg font-semibold hover:bg-gray-200 hover:cursor-pointer ${rowStyle} ${columnStyle}`}
      onClick={() => {
        console.log(number);
      }}
    >
      {number === "0" ? "" : number}
    </div>
  );
}
