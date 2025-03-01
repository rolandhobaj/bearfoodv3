import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { CardItem } from './CardItem';
import RecipeCard from './RecipeCard';
import AutoFillTextBox from './AutoFillTextbox';

function removeHungarianAccents(input: string): string {
  const hungarianAccentsMap: {[key: string]: string} = {
      'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ö': 'o', 'ő': 'o', 'ú': 'u', 'ü': 'u', 'ű': 'u',
      'Á': 'A', 'Í': 'I', 'É': 'E', 'Ó': 'O', 'Ö': 'O', 'Ő': 'O', 'Ú': 'U', 'Ü': 'U', 'Ű': 'U'
  };

  let output = '';

  for (const char of input) {
      const replacement = hungarianAccentsMap[char];
      output += replacement !== undefined ? replacement : char;
  }

  return output;
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  
const RecipeList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recipes, setRecipes] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loadRecipes = () => {
    setIsLoading(true);
    delay(500)
      .then(() => {
        const recipes: CardItem[] = [
          { id: "13", title: "Pityoklé", tags: ["Leves", "Regnyuzsi"], imageUri: "https://promova.com/content/fast_food_names_d368a9810d.png" },
          { id: "131", title: "Főzelék", tags: ["Főétel"], imageUri: "https://cdn.mindmegette.hu/2024/02/tyevJlIAvPZiXUZJZOSac3tiw4c-nYzyVp0JF8p0J5Y/fill/0/0/no/1/aHR0cHM6Ly9jbXNjZG4uYXBwLmNvbnRlbnQucHJpdmF0ZS9jb250ZW50L2Y1ZDEwYWFmYjlmYjQ2NjFiOTExMzJlZGQ5OGY1Mjhm.webp" },
          { id: "132", title: "Cukorka", tags: ["Desszert"], imageUri: "https://csokibolt.hu/img/5146/7878/7878.jpg" },
        ];

        setRecipes(recipes);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadRecipes();
  }, [])

  const filteredRecipes = recipes.filter(recipe => {
    if (searchQuery.length == 0){
      return true;
    }

    let title = removeHungarianAccents(recipe.title);
    var searchWord = removeHungarianAccents(searchQuery.toLowerCase());
    if (title.toLowerCase().includes(searchWord)){
      return true;
    }

    return recipe.tags.some(tag => removeHungarianAccents(tag).toLowerCase().includes(searchWord))
  });

  return (
    <View style={{ flex: 1 }}>
      <AutoFillTextBox onOptionSelected={setSearchQuery} />
      {isLoading
        ? <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 50 }}>Minnyá...</Text>
          </View>
        : <FlatList
            data={filteredRecipes}
            renderItem={(renderItem) => <RecipeCard title={renderItem.item.title} tags={renderItem.item.tags.join(', ')} imageUri={renderItem.item.imageUri}/>}
            keyExtractor={(item) => item.id}
            numColumns={2}
            refreshing={isLoading}
            onRefresh={loadRecipes}
          />
      }
    </View>
  );
};

export default RecipeList;