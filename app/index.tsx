import { ImageBackground, StyleSheet } from "react-native";
import RecipeList from "./RecipeList";

export default function Index() {
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
