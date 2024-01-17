import React, { ReactNode } from 'react';
import { useTheme } from 'styled-components'
import { View, Modal, StyleSheet, StyleProp, ViewStyle } from 'react-native'

interface BottomSheetModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    children?: ReactNode;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
    modalVisible,
    setModalVisible,
    children,
}: BottomSheetModalProps): JSX.Element => {
    const theme = useTheme();
    const styles = getStyles(theme)

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.rootContainer} testID="rootContainer">
                <View style={styles.bottomSheetContainer} testID="bottomSheetContainer">
                    {children}
                </View>
            </View>
        </Modal>
    )
}

interface Styles {
    rootContainer: StyleProp<ViewStyle>;
    bottomSheetContainer: StyleProp<ViewStyle>;
}

const getStyles = (theme: any): Styles => StyleSheet.create({
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