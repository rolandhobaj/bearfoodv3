import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const ModifyRecipeModal: React.FC<ModalProps> = ({ visible, onClose }) => {
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [hasTagsError, setHasTagsError] = useState(false);
  const [hasImageUrl, setHasImageUrl] = useState(false);

  const handleSave = () => {
    if (name !== '' && tags !== '' && imageUrl != ''){
      handleClose()
    }

    setHasNameError(name === '');
    setHasTagsError(tags === '');
    setHasImageUrl(imageUrl === '');
  };

  const handleClose = () => {
    setName('');
    setTags('');
    setImageUrl('');
    onClose();
  }


  const fetchCopiedImage = async () => {
    //const text = await Clipboard.getImage();
    setImageUrl('text');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
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
          <Text style={styles.label}>Kép URL</Text>
            <TextInput
              value={imageUrl}
              onChangeText={setImageUrl}
              style={hasImageUrl ? styles.inputError : styles.input}
            />
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.button} onPress={fetchCopiedImage}>
              <Text style={styles.buttonText}>Beillesztés</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setImageUrl('')}>
              <Text style={styles.buttonText}>Törlés</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={fetchCopiedImage}>
              <Text style={styles.buttonText}>Fotó</Text>
          </TouchableOpacity>
          </View>
          {imageUrl !== '' ? 
                <Image source={{ uri: imageUrl }} style={styles.image}/>: null} 
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50, marginBottom: 20 }}>
          <TouchableOpacity onPress={handleClose}>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClose}>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
          </TouchableOpacity>
        </View>
        </View>
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
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
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
    width: `100%`
  },
  inputError: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    padding: 10,
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
    padding: 8,
    borderRadius: 5,
    margin: 2,
    flexDirection: 'row'
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