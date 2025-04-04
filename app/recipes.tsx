import { ImageBackground, StyleSheet } from "react-native";
import React from "react";
import RecipeList from "@/components/RecipeList";

export default function Recipes() {
  return (
  <ImageBackground source={require('./resources/bg.png')} resizeMode="cover" style={styles.image}>
    <RecipeList/>
  </ImageBackground>
  );
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
  }
});
