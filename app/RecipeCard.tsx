import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card } from "@rneui/themed";
import ModifyRecipeModal from './ModifyRecipeModal';

interface CardProps {
  title: string;
  imageUri: string;
}

const RecipeCard: React.FC<CardProps> = ({ title, imageUri }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const isNewItem = false;

  return (
    <TouchableOpacity style={{width:'48%', marginLeft:3 }} onPress={() => {setIsVisible(true)}}>
    <Card containerStyle={styles.card}>
      <Card.Image 
       source={{ uri: imageUri }}
       style={styles.cardImage} />
      <Card.Title style={styles.text}>{title}</Card.Title>
    </Card>
    <ModifyRecipeModal isNewItem={isNewItem} visible={isVisible} onClose={() => setIsVisible(false)}/>
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
    fontSize: 25
  }
});

export default RecipeCard;