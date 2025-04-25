import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import ModifyRecipeModal from './ModifyRecipeModal';

interface ModalProps {
  refreshList: () => void;
  setIsLoading: (value: boolean) => void;
}

const RoundButton: React.FC<ModalProps> = ({ refreshList, setIsLoading }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const isNewItem = true;
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={() => setIsVisible(true)}>
        <Text style={styles.buttonText}>+</Text>
        {isVisible && <ModifyRecipeModal 
        setIsLoading={setIsLoading}
        id=''
        refreshList={refreshList}  originalName = '' originalTags = '' originalImage= ''  isNewItem={isNewItem} visible={isVisible} originalIngredients='' originalRecipe='' onClose={() => setIsVisible(false)}/>}
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