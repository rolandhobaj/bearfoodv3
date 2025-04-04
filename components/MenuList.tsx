import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { CardItem } from './CardItem';
import RecipeCard from './RecipeCard';
import AutoFillTextBox from './AutoFillTextbox';
import RecipeService from '../Service/RecipeService';
import NewRecipeButton from './NewRecipeButton';

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

const MenuList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recipes, setRecipes] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loadRecipes = () => {
    setIsLoading(true);

    RecipeService.getAllRecipe()
      .then((recipes) => {
        setRecipes(recipes.sort((a, b) => a.title.localeCompare(b.title)));
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
      <AutoFillTextBox onOptionSelected={setSearchQuery} labels={["Leves", "Regnyuzsi", "Főétel"]}/>
      {isLoading
        ? <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 50 }}>Minnyá...</Text>
          </View>
        : <FlatList
            data={filteredRecipes}
            renderItem={(renderItem) => <RecipeCard 
              setIsLoading={setIsLoading}
              id={renderItem.item.id}
              title={renderItem.item.title} tags={renderItem.item.tags.join(', ')} imageUri={renderItem.item.imageUri} refreshList={loadRecipes} isReadonly={false} recipe={''} ingredients={''}/>}
            keyExtractor={(item) => item.id}
            numColumns={2}
            refreshing={isLoading}
            onRefresh={loadRecipes}
          />
      }
      <NewRecipeButton refreshList={loadRecipes} setIsLoading={setIsLoading}/>
    </View>
  );
};

export default MenuList;