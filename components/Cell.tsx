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

  // rounded corner for the cell based on its position.
  const roundedCellRadius = (cellId: number) => {
    /**
     * cellId 0  = Top-Left
     * cellId 8  = Top-Right
     * cellId 72 = Bottom-Left
     * cellId 80 = Bottom-Right
     */
    switch (cellId) {
      case 0:
        return "rounded-tl-2xl"; // Top-left corner of the board
      case 8:
        return "rounded-tr-2xl"; // Top-right corner of the board
      case 72:
        return "rounded-bl-2xl"; // Bottom-left corner of the board
      case 80:
        return "rounded-br-2xl"; // Bottom-right corner of the board
      default:
        return ""; // All middle cells have sharp edges
    }
  };

  // cell highligh logic
  const isSelected = selectedIndex === cellId; // true if this specific cell is the one the user clicked
  const isSameRow =
    selectedIndex != null && row === Math.floor(selectedIndex / 9); // true if this cell shares the same horizontal row as the selection
  const isSameColumn = selectedIndex != null && column === selectedIndex % 9; // true if this cell shares the same vertical column as the selection

  // function to highligh the selected cell
  const highlighSelectedCell = () => {
    // highlight the selected cell
    if (isSelected) return "bg-blue-300";
  };

  // function to color the row & column of the selected cell
  const highlighSelectedCellRowAndColumn = () => {
    // if the cell is not the selected cell
    if (!isSelected) {
      // if the cell is in the same row or column of the selected cell, color the row/column
      if (isSameRow || isSameColumn) {
        return "bg-blue-100";
      }
    }
  };

  // TODO: function to highlight the 3x3 box of the selected cell

  return (
    <div
      className={`
        w-16 h-16
        flex items-center justify-center
        border border-zinc-200 ${roundedCellRadius(cellId)}
        text-zinc-800 text-xl font-semibold 
        cursor-pointer select-none hover:bg-zinc-100 
        ${rowStyle} ${columnStyle}
        ${highlighSelectedCell()} ${highlighSelectedCellRowAndColumn()}`}
      onClick={() => {
        // update selected index state for the UI
        setSelectedIndex();
      }}
    >
      {number === "0" ? "" : number}
      {/* {`${row}${column}`} */}
    </div>
  );
}
