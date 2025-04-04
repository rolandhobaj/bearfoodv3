import { Modal, View, StyleSheet, Text, ScrollView } from "react-native";

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    id: string;
    originalName: string,
    recipe: string
  }

  const RecipeDetailsModal: React.FC<ModalProps> = ({ isVisible, onClose, id, originalName, recipe}) => {

    const handleClose = () => {
      onClose();
    }
    
    console.log(recipe)
    return (
      <Modal visible={isVisible} animationType="slide" transparent onRequestClose={() => handleClose()} style={{height:'80%'}}> 
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>{originalName}</Text>
              <ScrollView style={styles.scrollView}>
                <Text style={styles.textBox}>{recipe}</Text>
              </ScrollView>
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
    scrollView: {
        flexGrow: 1,
        height:'85%'
      },
      textBox: {
        fontSize: 16,
        lineHeight: 24,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
      },
  });
  
export default RecipeDetailsModal;
