import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>SUDOKU</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      margin: 16,
    },
    headerText: {
        fontSize: 40,
        fontWeight: "bold",
        fontFamily: 'sans-serif',
    }
  });