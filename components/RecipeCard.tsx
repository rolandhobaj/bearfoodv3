import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from "@rneui/themed";
import ModifyRecipeModal from './ModifyRecipeModal';
import RecipeDetailsModal from './RecipeDetailsModal';

interface CardProps {
  title: string;
  imageUri: string;
  tags: string;
  id: string;
  recipe: string,
  ingredients: string,
  isReadonly: boolean,
  refreshList: () => void
  setIsLoading: (value: boolean) =>void
}

const RecipeCard: React.FC<CardProps> = ({ title, tags, imageUri, id, recipe, ingredients, isReadonly, refreshList, setIsLoading }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const isNewItem = false;

  return (
    <TouchableOpacity style={{width:'50%' }} onPress={() => {setIsVisible(true)}}>
    <Card containerStyle={styles.card}>
      <Card.Image 
       source={{ uri: imageUri }}
       style={styles.cardImage} />
      <Card.Title style={styles.text}>{title}</Card.Title>
    </Card>
    {(isVisible && !isReadonly) && <ModifyRecipeModal
      id={id} 
      originalName={title}
      originalTags={tags}
      originalImage={imageUri}
      refreshList={refreshList}
      setIsLoading={setIsLoading}
      isNewItem={isNewItem} visible={isVisible} onClose={() => setIsVisible(false)}/>}
    {(isVisible && isReadonly) && <RecipeDetailsModal
        id={id}
        originalName={title}
        onClose={() => setIsVisible(false)} isVisible={isVisible} recipe={recipe} ingredients={ingredients}/>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(18,57,6,0.5)',
  },
  cardImage: {
    borderRadius: 10,
  },
  text: {
    marginTop:4,
    marginBottom:-3,
    color: 'white',
    fontSize: 16
  }
});

export default RecipeCard;