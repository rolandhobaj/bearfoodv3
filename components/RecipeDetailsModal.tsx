import { Modal, View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    id: string;
    originalName: string,
    recipe: string,
    ingredients: string,
  }

  const RecipeDetailsModal: React.FC<ModalProps> = ({ isVisible, onClose, id, originalName, recipe, ingredients}) => {

    const handleClose = () => {
      onClose();
    }
    
    return (
      <Modal visible={isVisible} animationType="slide" transparent onRequestClose={() => handleClose()} style={{height:'80%'}}> 
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>{originalName}</Text>
              <ScrollView style={styles.scrollView}>
                <Text style={styles.header}>Hozzávalók:</Text>
                <Text style={styles.textBox}>{ingredients}</Text>
                <Text style={styles.header}>Elkészítés:</Text>
                <Text style={styles.textBox}>{recipe}</Text>
              </ScrollView>
              <TouchableOpacity onPress={handleClose}>
            <Icon name="arrow-back" size={40} color="gray" />
          </TouchableOpacity>
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
    image: {
        width: 100, 
        height: 100, 
        marginTop: 10,
        alignSelf: 'center',
        borderWidth: 1, borderColor: 'black'
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
      width: '80%',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    header: {
        fontSize: 15,
        marginTop: 21,
        fontWeight: 'bold',
      },
    scrollView: {
        flexGrow: 1,
        height:'70%'
      },
      textBox: {
        fontSize: 16,
        lineHeight: 24,
        backgroundColor: "#fff",
        padding:4,
        borderRadius: 8,
        textAlign: 'justify'
      },
  });
  
export default RecipeDetailsModal;
