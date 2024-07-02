import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

export const NumberSelector = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select a number</Text>
      <View style={styles.numberContainer}>
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <Pressable
              key={index}
              style={styles.numberBox}
              onPress={() => {
                props.onPress(index);
              }}
            >
              <Text style={styles.number}>{index}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const calculatedWidth = screenWidth - 32;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginVertical: 20,
    flex: 1,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
  numberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  numberBox: {
    width: calculatedWidth / 9,
    height: calculatedWidth / 9,
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    color: "teal",
  },
});
