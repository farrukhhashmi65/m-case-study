import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import BottomSheetModal from './BottomSheetModal';
import Button from './Button';
import Separator from './Separator';
import { useTranslation } from 'react-i18next'
import { Languages } from '../config/constants'
import Text, { fontVariant } from './Text';

const LanguagesListModal: React.FC<any> = (props): JSX.Element => {
    const { t } = useTranslation()
    const styles = getStyles()

    const { languageModalVisible, setLanguageModalVisible, onLanguageSelect } = props;

    const renderItem = (row: any): any => (
        <TouchableOpacity onPress={() => onLanguageSelect(row.item)} style={styles.listItem} activeOpacity={0.7}>
            <Text variant={fontVariant.body2}>{t(`languages.${row.item}`)}</Text>
        </TouchableOpacity>
    );

    return (
        <BottomSheetModal {...{ modalVisible: languageModalVisible, setModalVisible: setLanguageModalVisible }} >
            <>
                <Text variant={fontVariant.h4}>{t('changeLanguage')}</Text>
                <View style={styles.listContainer}>
                    <FlatList
                        data={Languages}
                        renderItem={renderItem}
                        keyExtractor={(item) => item}
                        ItemSeparatorComponent={() => <Separator />}
                    />
                </View>
                <Button
                    onPress={() => setLanguageModalVisible(false)}
                    title={t('close')}
                />
            </>
        </BottomSheetModal>
    )
}


const getStyles = () => StyleSheet.create({
    listItem: {
        height: 54,
        justifyContent: 'center'
    },
    listContainer: {
        marginVertical: 12
    }
})


export default LanguagesListModal;