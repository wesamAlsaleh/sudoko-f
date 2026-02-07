"use client";

import React, { useState } from "react";

export default function Cell({
  number,
  cellId,
  selectedIndex,
  setSelectedIndex,
  inputStatus,
}: {
  number: number;
  cellId: number;
  selectedIndex: number | null;
  setSelectedIndex: () => void;
  inputStatus: boolean | null;
}) {
  // get the cell coordinates
  const row = Math.floor(cellId / 9); // get the row index (0 -> 8)
  const column = cellId % 9; // get the column index (0 -> 8)
  const box = Math.floor(row / 3) * 3 + Math.floor(column / 3); // get the box index (0 -> 8)

  // get the selected cell coordinates for box highlighting
  const selectedCellRow =
    selectedIndex != null && Math.floor(selectedIndex / 9); // get the row index
  const selectedCellColumn = selectedIndex != null && selectedIndex % 9; // get the row index

  // custom border style based on the location (after each 3 cells)
  const rowBorderStyle = row % 3 == 0 && row != 0 ? "border-t-4" : ""; // add the divider in the rows that are dividable by 3 and not the first row
  const columnBorderStyle = column % 3 == 0 && column != 0 ? "border-l-4" : ""; // add the divider in the columns that are dividable by 3 and not the first column

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
    selectedIndex != null && row === Math.floor(selectedIndex / 9); // true if this cell shares the same horizontal row as the selected cell
  const isSameColumn = selectedIndex != null && column === selectedIndex % 9; // true if this cell shares the same vertical column as the selected cell
  const isSameBox =
    selectedIndex != null &&
    selectedIndex !== null &&
    box ===
      Math.floor((selectedCellRow as number) / 3) * 3 +
        Math.floor((selectedCellColumn as number) / 3); // true if this cell shares the same box as the selected cell

  // declare the highlight colors
  const selectedCellColor = "bg-blue-300"; // primary color for the specific cell you clicked
  const highlightGroupColor = "bg-blue-100"; // lighter color for the related row, column, and 3x3 box

  const validInputTextStyle = "text-emerald-600 transition-colors duration-300";
  const notValidInputTextStyle = "text-rose-600 animate-shake"; // Add 'shake' to tailwind.config.js

  // function to highligh the selected cell
  const highlighSelectedCell = () => {
    // highlight the selected cell
    if (isSelected) return selectedCellColor;
  };

  // function to color the row & column of the selected cell
  const highlighSelectedCellRowAndColumnAndBox = () => {
    // if the cell is not the selected cell
    if (!isSelected) {
      // if the cell is in the same row or column or box of the selected cell, color the row/column
      if (isSameRow || isSameColumn || isSameBox) {
        return highlightGroupColor;
      }
    }
  };

  // function to color the number in the cell based on the input status
  const highlighCellValue = () => {
    // if this cell isn't the one being interacted with, use default
    if (inputStatus === null) return "text-zinc-800";

    // if inputStatus is false (invalid placement)
    if (inputStatus === false) {
      return notValidInputTextStyle;
    }

    // if inputStatus is true (valid placement)
    if (inputStatus === true) {
      return validInputTextStyle;
    }

    // default color
    return "text-zinc-800";
  };

  return (
    <div
      className={`
        w-16 h-16
        flex items-center justify-center
        border border-zinc-200 ${roundedCellRadius(cellId)}
        text-xl font-semibold ${highlighCellValue()}
        cursor-pointer select-none hover:bg-blue-100/30
        ${rowBorderStyle} ${columnBorderStyle}
        ${highlighSelectedCell()} ${highlighSelectedCellRowAndColumnAndBox()}`}
      onClick={() => {
        // update selected index state for the UI
        setSelectedIndex();
      }}
    >
      {number === 0 ? "" : number}
      {/* {`${row}${column}`} */}
    </div>
  );
}
