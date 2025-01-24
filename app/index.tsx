import { Text, ImageBackground, StyleSheet } from "react-native";
import { CardItem } from "./CardItem";
import RecipeList from "./RecipeList";
import NewRecipeButton from "./NewRecipeButton";

export default function Index() {
  const recipes: CardItem[] = [
    {id : "13", title: "Pityoklé", tags: ["Leves"], imageUri: "https://promova.com/content/fast_food_names_d368a9810d.png"},
    {id : "14", title: "Sűrű", tags: ["Főétel"], imageUri: "https://promova.com/content/fast_food_names_d368a9810d.png"},
    {id : "15", title: "CukrosPityóka", tags: ["Desszert"], imageUri: "https://promova.com/content/fast_food_names_d368a9810d.png"},
    {id : "131", title: "Pityoklé", tags: ["Leves"], imageUri: "https://promova.com/content/fast_food_names_d368a9810d.png"},
    {id : "142", title: "Sűrű", tags: ["Főétel"], imageUri: "https://promova.com/content/fast_food_names_d368a9810d.png"},
    {id : "153", title: "CukrosPityóka", tags: ["Desszert"], imageUri: "https://promova.com/content/fast_food_names_d368a9810d.png"},
    {id : "134", title: "Pityoklé", tags: ["Leves"], imageUri: "https://promova.com/content/fast_food_names_d368a9810d.png"},
    {id : "145", title: "Sűrű", tags: ["Főétel"], imageUri: "https://promova.com/content/fast_food_names_d368a9810d.png"},
    {id : "156", title: "CukrosPityóka", tags: ["Desszert"], imageUri: "https://promova.com/content/fast_food_names_d368a9810d.png"},
    {id : "137", title: "Pityoklé", tags: ["Leves"], imageUri: "https://promova.com/content/fast_food_names_d368a9810d.png"},
    {id : "148", title: "Sűrű", tags: ["Főétel"], imageUri: "https://promova.com/content/fast_food_names_d368a9810d.png"},
    {id : "159", title: "CukrosPityóka", tags: ["Desszert"], imageUri: "https://promova.com/content/fast_food_names_d368a9810d.png"},
  ] ;



  return (
    <ImageBackground source={require('./resources/bg.png')} resizeMode="cover" style={styles.image}>
       <RecipeList recipes={recipes}/>
       <NewRecipeButton/>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  }
});
