import { ImageBackground, StyleSheet } from "react-native";
import MenuList from "../components/MenuList";
import React from "react";

export default function Foods() {
  return (
  <ImageBackground source={require('./resources/bg.png')} resizeMode="cover" style={styles.image}>
    <MenuList/>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  }
});
