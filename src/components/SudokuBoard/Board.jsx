import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSudokuBoard } from "./useSudokuBoard";
import { NumberSelector } from "./NumberSelector";

export const SudokuBoard = (props) => {
  /* 9x9 grid of boxes */
  const { sudokuBoard, updateBoard, initSudokuBoard, isWrongNumber, boardFilledCnt, checkIfBoardIsSolved } =
    useSudokuBoard();
  const [selectedBox, setSelectedBox] = useState({
    row: -1,
    col: -1,
  });

  useEffect(() => {
    console.log(boardFilledCnt);
    if(boardFilledCnt == 81 && checkIfBoardIsSolved()) {
      alert("Congratulations! You have completed the Sudoku");
    }
  }, [boardFilledCnt])

  const [errorBox, setErrorBox] = useState({ row: -1, col: -1 });

  useEffect(() => {
    initSudokuBoard(props.board);
  }, [props.board]);

  const onNumberPress = useCallback(
    (number) => {
      if (selectedBox.row === -1 || selectedBox.col === -1) {
        return;
      }

      updateBoard(selectedBox.row, selectedBox.col, number);

      if (number > 0 && isWrongNumber(selectedBox.row, selectedBox.col, number)) {
        setErrorBox({ row: selectedBox.row, col: selectedBox.col });
      } else {
        setErrorBox({ row: -1, col: -1 });
      }
    },
    [selectedBox]
  );

  const getBoxStyle = (rowFlag, colFlag) => {
    if (rowFlag === colFlag) {
      return styles.oddBox;
    } else {
      return styles.evenBox;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ borderWidth: 1, borderColor: "#00000050" }}>
        {sudokuBoard.map((_, rowIndex) => {
          const flag = Math.floor(rowIndex / 3) % 2 === 0 ? true : false;
          return (
            <View key={rowIndex} style={{ flexDirection: "row", zIndex: 2 }}>
              {sudokuBoard[rowIndex].map((_, colIndex) => {
                const isSelected =
                  selectedBox.row === rowIndex && selectedBox.col === colIndex;
                const isError =
                  errorBox.row === rowIndex && errorBox.col === colIndex;
                const boxBgColor = getBoxStyle(
                  Math.floor(colIndex / 3) % 2 === 0,
                  flag
                );
                return (
                  <Pressable
                    onPress={() => {
                      if (errorBox.row !== -1 || errorBox.col !== -1) return;
                      setSelectedBox({ row: rowIndex, col: colIndex });
                    }}
                  >
                    <View
                      key={colIndex}
                      style={[
                        styles.boxView,
                        boxBgColor,
                        isSelected ? styles.selectedBox : styles.normalBox,
                        isError ? styles.errorBox : "",
                      ]}
                    >
                      <Text
                        style={[
                          styles.textView,
                          isSelected ? styles.selectedText : "",
                        ]}
                      >
                        {sudokuBoard[rowIndex][colIndex] === 0
                          ? ""
                          : sudokuBoard[rowIndex][colIndex]}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          );
        })}
      </View>
      <NumberSelector onPress={onNumberPress} />
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const calculatedWidth = screenWidth - 34;

const boxWidth = calculatedWidth / 9;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    width: calculatedWidth,
    flex: 1,
    height: calculatedWidth,
  },
  boxView: {
    width: boxWidth,
    height: boxWidth,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  normalBox: {
    borderColor: "#00000050",
  },
  edgeBox: {
    borderColor: "red",
  },
  selectedBox: {
    borderColor: "#a2bae0",
    borderWidth: 2,
    backgroundColor: "#a2bae050",
  },
  errorBox: {
    borderColor: "red",
    borderWidth: 2,
    backgroundColor: "#ff000050",
  },
  textView: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
  selectedText: {
    fontSize: 16,
  },
  oddBox: {
    backgroundColor: "#fff",
  },
  evenBox: {
    backgroundColor: "#f5ede6",
  },
});
