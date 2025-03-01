import { ImageBackground, StyleSheet } from "react-native";
import RecipeList from "./RecipeList";
import NewRecipeButton from "./NewRecipeButton";

export default function Index() {
  return (
    <ImageBackground source={require('./resources/bg.png')} resizeMode="cover" style={styles.image}>
       <RecipeList/>
       <NewRecipeButton/>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  }
});
