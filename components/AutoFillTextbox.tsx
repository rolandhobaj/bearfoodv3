import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';

interface AutoFillTextBoxProps {
  onOptionSelected: (option: string) => void;
  labels: string[]
}

const AutoFillTextBox: React.FC<AutoFillTextBoxProps> = ({ onOptionSelected, labels }) => {
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
            <Text style={{ fontSize:25, marginTop:10, marginRight: 7, color:'gray' }}>X</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.labelsContainer}>
        <TouchableOpacity onPress={() => handleTextChange(labels[0])}>
          <Text style={styles.label}>{labels[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTextChange(labels[1])}>
          <Text style={styles.label}>{labels[1]}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTextChange(labels[2])}>
          <Text style={styles.label}>{labels[2]}</Text>
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
      paddingLeft:14,
      height:'85%'
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
      },
    label: {
        paddingHorizontal: 6,
        paddingVertical: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        fontSize: 14,
        borderColor: 'rgba(18,57,6,0.35)',
        borderWidth: 3,
        verticalAlign: 'middle',
        marginHorizontal: 5,
        textAlign: 'center',
        color:'rgba(18,57,6,1)'
      },
  });

export default AutoFillTextBox;