import React, { useState, useEffect } from 'react';
import { TextInput, View, FlatList, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import RecipeService from './Service/RecipeService';

interface AutoFillTextBoxProps {
  onOptionSelected: (option: string) => void;
}

const AutoFillTextBox: React.FC<AutoFillTextBoxProps> = ({ onOptionSelected }) => {
  const [text, setText] = useState('');

  const handleTextChange = async (inputText: string) => {
    setText(inputText);
    // Show options when input text is not empty
    onOptionSelected(inputText);
  };

  const handleClearText = () => {
    setText('');
    onOptionSelected('');
  };
  
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
            value={text}
            onChangeText={handleTextChange}
            style={styles.text}
            placeholder="Szűrj kategóriára..."
        />
        {text !== '' && (
          <TouchableOpacity style={{ position: 'absolute', right: '5%' }} onPress={handleClearText}>
            <Text style={{ fontSize:22, fontWeight:'bold', marginTop:6 }}>X</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.labelsContainer}>
        <TouchableOpacity onPress={() => handleTextChange('Leves')}>
          <Text style={styles.label}>Leves</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTextChange('Regnyuzsi')}>
          <Text style={styles.label}>Regnyuzsi</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTextChange('Főétel')}>
          <Text style={styles.label}>Főétel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTextChange('Desszert')}>
          <Text style={styles.label}>Desszert</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
    text: {
      marginTop:15,
      marginLeft:10,
      marginRight:10,
      color:'black',
      backgroundColor: 'white',
      fontSize: 20,
      flex:1,
      paddingLeft:14
    },
    listText: {
        backgroundColor: 'white',
        marginLeft:10,
        marginRight:10,
        color:'black',
        borderBottomWidth:2,
        paddingLeft:14,
        fontSize: 20
      },
    labelsContainer: {
        flexDirection: 'row',
        margin:10,
        justifyContent: 'space-between',
      },
    label: {
        paddingHorizontal: 6,
        paddingVertical: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        fontSize: 18,
        borderColor: 'rgba(18,57,6,0.35)',
        borderWidth: 3,
        verticalAlign: 'middle',
        marginHorizontal: 5,
        textAlign: 'center',
        color:'rgba(18,57,6,1)'
      },
  });

export default AutoFillTextBox;