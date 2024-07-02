import { useCallback, useEffect, useState } from "react";

const getNewEmptyBoard = () => {
  return Array.from({ length: 9 }).map((_, rowIndex) =>
    Array.from({ length: 9 }).map((_, rowIndex) => 0)
  );
};

export const useSudokuBoard = () => {
  const [sudokuBoard, setSudokuBoard] = useState(getNewEmptyBoard());
  const [boardFilledCnt, setBoardFilledCnt] = useState(0);

  const initSudokuBoard = useCallback((board) => {
    const newBoard = getNewEmptyBoard();
    if (!board) {
      return;
    }

    let index = 0;
    let tempCnt = 0;
    newBoard?.forEach((_, rowIndex) => {
      newBoard[rowIndex].forEach((_, colIndex) => {
        newBoard[rowIndex][colIndex] = isNaN(+board[index]) ? 0 : +board[index];

        if (newBoard[rowIndex][colIndex] != 0) tempCnt++;
        index++;
      });
    });
    setBoardFilledCnt(tempCnt);
    setSudokuBoard(() => newBoard);
  }, []);

  const updateBoard = useCallback((row, col, value) => {
    setSudokuBoard((prev) => {
      const newBoard = [];
      prev.map((rows) => newBoard.push([...rows]));
      if (value == 0 && newBoard[row][col] != 0)
        setBoardFilledCnt((prev) => prev - 1);
      else if (value != 0 && newBoard[row][col] == 0)
        setBoardFilledCnt((prev) => prev + 1);
      newBoard[row][col] = value;
      return newBoard;
    })
  }, []);

  const isWrongNumber = useCallback(
    (row, col, value) => {
      // already not present in same row
      for (let colIdx = 0; colIdx < 9; colIdx++) {
        if (colIdx === col) continue;

        if (sudokuBoard[row][colIdx] === value) return true;
      }

      // already not present in same column
      for (let rowIdx = 0; rowIdx < 9; rowIdx++) {
        if (rowIdx === col) continue;

        if (sudokuBoard[rowIdx][col] === value) return true;
      }

      // already not present in same 3x3 grid
      let i = Math.floor(row / 3) * 3;
      let j = Math.floor(col / 3) * 3;
      for (let rowIdx = i; rowIdx < i + 3; rowIdx++) {
        for (let colIdx = j; colIdx < j + 3; colIdx++) {
          if (sudokuBoard[rowIdx][colIdx] === value) return true;
        }
      }

      return false;
    },
    [sudokuBoard]
  );

  const checkIfBoardIsSolved = useCallback(() => {
    sudokuBoard.forEach((rowBoard, rowIdx) => {
      rowBoard.forEach((val, colIdx) => {
        if (isWrongNumber(rowIdx, colIdx, val)) return false;
      });
    });
    return true;
  }, [sudokuBoard]);

  return {
    sudokuBoard,
    updateBoard,
    initSudokuBoard,
    isWrongNumber,
    boardFilledCnt,
    checkIfBoardIsSolved,
  };
};
