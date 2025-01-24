import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import ModifyRecipeModal from './ModifyRecipeModal';

const RoundButton: React.FC = ({ }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={() => setIsVisible(true)}>
        <Text style={styles.buttonText}>+</Text>
        <ModifyRecipeModal visible={isVisible} onClose={() => setIsVisible(false)}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    width: 70,
    height: 70,
    borderRadius: 120,
    backgroundColor: 'rgba(18,57,6, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default RoundButton;