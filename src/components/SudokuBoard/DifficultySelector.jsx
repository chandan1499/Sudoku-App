import { Pressable, StyleSheet, Text, View } from "react-native";
import { SudokuBoard } from "./Board";
import React, { useEffect, useState } from "react";
import { getSudoku } from "sudoku-gen";

export const DifficultySelector = () => {
  const [selectedBox, setSelectedBox] = useState(0);
  const [difficulty, setDifficulty] = useState([
    "Easy",
    "Medium",
    "Hard",
    "Expert",
  ]);
  const [puzzle, setPuzzle] = useState("");

  useEffect(() => {
    const newSudoku = getSudoku(difficulty[selectedBox].toLowerCase());
    setPuzzle(newSudoku?.puzzle);
  }, [selectedBox]);

  return (
    <>
      <View style={styles.DifficultySelectorBox}>
        {
          /* Difficulty selector buttons */
          difficulty.map((difficultyText, index) => {
            return (
              <Pressable
                style={[
                  styles.button,
                  selectedBox === index ? styles.selectedBtn : "",
                ]}
                onPress={() => setSelectedBox(index)}
              >
                <Text
                  style={[
                    selectedBox === index ? styles.selectorText : "",
                    styles.text,
                  ]}
                >
                  {difficultyText}
                </Text>
              </Pressable>
            );
          })
        }
      </View>

      <SudokuBoard board={puzzle} />
    </>
  );
};

const styles = StyleSheet.create({
  DifficultySelectorBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 16,
    marginTop: 0,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectorText: {
    color: "#fff",
  },
  selectedBtn: {
    backgroundColor: "teal",
    borderRadius: 5,
    borderColor: "teal",
  },
});
