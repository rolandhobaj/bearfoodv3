import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from "expo-image-picker";
import RecipeService from '../Service/RecipeService';

interface ModalProps {
  isNewItem: boolean;
  visible: boolean;
  onClose: () => void;
  id: string;
  originalName: string,
  originalTags: string,
  originalImage: string,
  originalIngredients: string,
  originalRecipe: string,
  isDetailedRecipe: boolean,
  refreshList: () => void;
  setIsLoading: (value: boolean) => void
}

const ModifyRecipeModal: React.FC<ModalProps> = ({ isNewItem, visible, onClose, id, originalName, originalTags, originalImage, originalIngredients, originalRecipe, isDetailedRecipe, refreshList, setIsLoading}) => {
  const [name, setName] = useState(originalName);
  const [tags, setTags] = useState(originalTags);
  const [imageUrl, setImageUrl] = useState(originalImage);
  const [ingredients, setIngredients] = useState(originalIngredients);
  const [recipe, setRecipe] = useState(originalRecipe);
  const [hasNameError, setHasNameError] = useState(false);
  const [hasTagsError, setHasTagsError] = useState(false);
  const [hasImageUrl, setHasImageUrl] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  console.log(originalIngredients)
  const handleSave = () => {
    setHasNameError(name === '');
    setHasTagsError(tags === '');
    setHasImageUrl(imageUrl === '');

    if (name !== '' && tags !== '' && imageUrl != ''){
      setIsLoading(true)
      handleClose()
      
      if (isNewItem){  
        RecipeService.addRecipe({
          title: name,
          tags: tags.split(',').map(t => t.trim()),
          imageUri: imageUrl,
          id: 'toBeGenerated'
        }).then(() => {
          refreshList()        
        })

        return
      }

      RecipeService.deleteItem(id, originalImage, !imageUrl.includes('firebasestorage'))
      .then(() => {
        RecipeService.addRecipe({
          title: name,
          tags: tags.split(',').map(t => t.trim()),
          imageUri: imageUrl,
          id: 'toBeGenerated'
        }).then(() => {
          refreshList()        
        })
      })
    }
  };

  const handleClose = () => {
    setName('');
    setTags('');
    setImageUrl('');
    onClose();
  }

  const deleteRecipe = () => {
    setIsLoading(true)
    handleClose()
    RecipeService.deleteItem(id, originalImage, true)
    .then(() => {
      refreshList()
    })
  }

  const fetchCopiedImage = async () => {
    const image = await Clipboard.getImageAsync({format: 'jpeg'});
    setImageUrl(image?.data ?? '');
  };
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const detailedRecipe = isDetailedRecipe ? (
    <View>
            <Text style={styles.label}>Hozzávalók</Text>
            <TextInput
              multiline
              scrollEnabled
              textAlignVertical="top"
              value={ingredients}
              placeholder="Hozzávalók megadása..."
              onChangeText={setIngredients}
              style={hasImageUrl ? styles.inputError : styles.higherInput}
            />
            <Text style={styles.label}>Recept</Text>
            <TextInput
              multiline
              scrollEnabled
              textAlignVertical="top"
              value={recipe}
              onChangeText={setRecipe}
              placeholder="Recept megadása..."
              style={hasImageUrl ? styles.inputError : styles.highestInput}
            />
          </View>
  ) : null

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
       <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}
      style={{ backgroundColor: 'white', width: '80%', maxHeight: '90%', borderRadius: 12, flexGrow: 0 }}>
          <Text style={styles.title}>Recept hozzáadása</Text>
          <Text style={styles.label}>Név</Text>
          <TextInput
            style={hasNameError ? styles.inputError : styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Név megadása..."
          />
          <Text style={styles.label}>Cimkék</Text>
          <TextInput
            style={hasTagsError ? styles.inputError : styles.input}
            value={tags}
            onChangeText={setTags}
            placeholder="Cimke megadása..."
          />
          
          {detailedRecipe}

          <Text style={styles.label}>Kép URL</Text>
            <TextInput
              value={imageUrl}
              onChangeText={setImageUrl}
              style={hasImageUrl ? styles.inputError : styles.input}
            />
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.button} onPress={() => setImageUrl('')}>
            <Icon name="delete" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={fetchCopiedImage}>
            <Icon name="content-paste-go" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Icon name="photo-camera" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Icon name="image" size={32} color="white" />
          </TouchableOpacity>
          </View>
          {imageUrl !== '' && !isKeyboardVisible ? 
                <Image source={{ uri: imageUrl }} style={styles.image}/>: null} 
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50, marginBottom: 20 }}>
          <TouchableOpacity onPress={handleClose} style={{marginLeft:24}}>
            <Icon name="close" size={40} color="red" />
          </TouchableOpacity>
          {!isNewItem ?
          <TouchableOpacity onPress={deleteRecipe}>
            <Icon name="delete" size={40} color="black" />
          </TouchableOpacity>
          : null
          }
          <TouchableOpacity onPress={handleSave} style={{marginRight:30}}>
            <Icon name="check" size={40} color="green" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height:'100%'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: '95%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  imageLabel: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: `100%`,
    height: 50
  },
  higherInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: `100%`,
    height: 120
  },
  highestInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: `100%`,
    height: 200
  },
  inputError: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    padding: 10,
    height: 50,
    marginBottom: 10,
    width: `100%`
  },
  image: {
    width: 200, 
    height: 200, 
    marginTop: 10,
    alignSelf: 'center',
    borderWidth: 1, borderColor: 'black'
  },
  button: {
    flex:1,
    backgroundColor: '#4E787D',
    padding: 4,
    borderRadius: 5,
    margin: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
  },
  xButton:{
    fontSize:22,
    fontWeight:'bold',
    marginTop:6,
    marginLeft: 10 
  }
});

export default ModifyRecipeModal;