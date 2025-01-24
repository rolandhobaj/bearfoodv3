import { Text, ImageBackground, StyleSheet } from "react-native";

export default function Index() {
  return (
    <ImageBackground source={require('./resources/bg.png')} resizeMode="cover" style={styles.image}>
      <Text>HI.tsx to edit asdasd screen.</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  }
});
