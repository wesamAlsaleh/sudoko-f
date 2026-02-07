export class SudokuSolver {
  // constructor
  constructor() {}

  // Declare the grid size 9x9 as a static constant
  private static readonly GRID_SIZE: number = 9;

  /**
   * Checks if a specific number already exists within a given row.
   * @param board - The 2D 9x9 numerical array representing the Sudoku board.
   * @param row - The index of the row to check (0-8).
   * @param number - The number to search for (1-9).
   * @returns True if the number is found, false otherwise.
   */
  private isNumberInRow(
    board: number[][],
    row: number,
    number: number,
  ): boolean {
    // Iterate over the row elements (0 -> 8)
    for (let i = 0; i < SudokuSolver.GRID_SIZE; i++) {
      // If the number exists in the row, return true
      if (board[row][i] === number) {
        return true;
      }
    }
    // Default: Number not found in row
    return false;
  }

  /**
   * Checks if a specific number already exists within a given column.
   * @param board - The 2D 9x9 numerical array.
   * @param col - The index of the column to check (0-8).
   * @param number - The number to search for (1-9).
   * @returns True if the number is found, false otherwise.
   */
  private isNumberInColumn(
    board: number[][],
    col: number,
    number: number,
  ): boolean {
    // Iterate over the column elements (0 -> 8)
    for (let i = 0; i < SudokuSolver.GRID_SIZE; i++) {
      // If the number exists in the column, return true
      if (board[i][col] === number) {
        return true;
      }
    }
    // Default: Number not found in column
    return false;
  }

  /**
   * Checks if a specific number exists within the 3x3 sub-grid (box).
   * @param board - The 2D 9x9 numerical array.
   * @param row - The current row index.
   * @param col - The current column index.
   * @param number - The number to search for.
   * @returns True if the number is found within the 3x3 box.
   */
  private isNumberInGrid(
    board: number[][],
    row: number,
    col: number,
    number: number,
  ): boolean {
    // Get the grid start index (top-left of the 3x3 box) using floor division
    const localRowIndex = row - (row % 3);
    const localColIndex = col - (col % 3);

    // Declare the box end boundaries
    const rowEnd = localRowIndex + 3;
    const colEnd = localColIndex + 3;

    // Iterate over the 3x3 sub-grid
    for (let i = localRowIndex; i < rowEnd; i++) {
      for (let j = localColIndex; j < colEnd; j++) {
        // If the number exists in the sub-grid, return true
        if (board[i][j] === number) {
          return true;
        }
      }
    }
    // Default: Number not found in the 3x3 box
    return false;
  }

  /**
   * Validates if a number can be placed at a specific coordinate based on
   * Sudoku rules (Row, Column, and 3x3 Grid uniqueness).
   */
  public isValidPlacement(
    board: number[][],
    row: number,
    col: number,
    number: number,
  ): boolean {
    // Return true if the number is not in the row, column, or 3x3 grid
    return (
      !this.isNumberInRow(board, row, number) &&
      !this.isNumberInColumn(board, col, number) &&
      !this.isNumberInGrid(board, row, col, number)
    );
  }

  /**
   * Helper function to check if a number is valid only within its 3x3 box.
   */
  public validNumberInBox(
    board: number[][],
    row: number,
    col: number,
    number: number,
  ): boolean {
    // Return true if the number is not already present in the local 3x3 grid
    return !this.isNumberInGrid(board, row, col, number);
  }

  /**
   * Validates a placement using a flat 81-element array.
   * @param flatBoard - The 1D array representing the 9x9 board.
   * @param index - The index in the array (0-80).
   * @param number - The number to validate (1-9).
   */
  public checkFlatPlacement(
    flatBoard: number[],
    index: number,
    number: number,
  ): boolean {
    // Convert 1D -> 2D
    const board2D: number[][] = [];

    // iterate over the
    for (let i = 0; i < SudokuSolver.GRID_SIZE; i++) {
      // add elements
      board2D.push(flatBoard.slice(i * 9, i * 9 + 9));
    }

    const row = Math.floor(index / 9);
    const col = index % 9;

    // Call your existing 2D logic
    return this.isValidPlacement(board2D, row, col, number);
  }
}
