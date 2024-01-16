import React from 'react';
import { useTheme } from 'styled-components'
import { View, Modal, StyleSheet } from 'react-native'

const BottomSheetModal: React.FC<any> = (props): JSX.Element => {
    const theme = useTheme();
    const styles = getStyles(theme)
    const {modalVisible, setModalVisible} = props;
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.rootContainer} >
                <View style={styles.bottomSheetContainer}>
                    {props.children}
                </View>
            </View>
        </Modal>
    )
}


const getStyles = (theme: any) => StyleSheet.create({
    rootContainer: {
        flex: 1,
      },
      bottomSheetContainer: { 
          position: 'absolute', 
          bottom: 0, 
          width: '100%', 
          paddingVertical: 40, 
          paddingHorizontal: 22, 
          backgroundColor: theme.PRIMARY_COLOR_FAINT, 
          borderRadius: 16, 
          borderColor: theme.PRIMARY_COLOR_LIGHT, 
          borderWidth: 1 
      }
})


export default BottomSheetModal;