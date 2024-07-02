import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Header } from "./src/components/SudokuHeader/SudokuHeader";
import { DifficultySelector } from "./src/components/SudokuBoard/DifficultySelector";

export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Header />
      <DifficultySelector />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaViewStyle: { marginTop: 50, flex: 1, overflow: 'scroll' }
});
