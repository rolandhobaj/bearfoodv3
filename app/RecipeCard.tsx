import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from "@rneui/themed";

interface CardProps {
  title: string;
  imageUri: string;
}

const RecipeCard: React.FC<CardProps> = ({ title, imageUri }) => {
  return (
    <Card containerStyle={styles.card}>
      <Card.Image 
       source={{ uri: imageUri }}
       style={styles.cardImage} />
      <Card.Title style={styles.text}>{title}</Card.Title>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '42%',
    marginBottom:12,
    backgroundColor: 'rgba(18,57,6,0.35)',
    borderRadius: 5
  },
  cardImage: {
    borderRadius: 10,
  },
  text: {
    marginTop:15,
    color: 'white',
    fontSize: 25
  }
});

export default RecipeCard;