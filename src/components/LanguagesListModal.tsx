import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import BottomSheetModal from './BottomSheetModal';
import Button from './Button';
import Separator from './Separator';
import { useTranslation } from 'react-i18next'
import { Languages } from '../config/constants'
import Text, { fontVariant } from './Text';

interface LanguagesListModalProps {
    languageModalVisible: boolean;
    setLanguageModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onLanguageSelect: (language: string) => void;
}

interface RenderItemProps {
    item: string;
    index: number;
}

const LanguagesListModal: React.FC<any> = (props: LanguagesListModalProps): JSX.Element => {
    const { t } = useTranslation()
    const styles = getStyles()

    const { languageModalVisible, setLanguageModalVisible, onLanguageSelect } = props;

    const renderItem = ({ item, index }: RenderItemProps) => (
        <TouchableOpacity onPress={() => onLanguageSelect(item)} style={styles.listItem} activeOpacity={0.7} testID={`languageListItem_${index}`}>
            <Text variant={fontVariant.body2}>{t(`languages.${item}`)}</Text>
        </TouchableOpacity>
    );

    return (
        <BottomSheetModal {...{ modalVisible: languageModalVisible, setModalVisible: setLanguageModalVisible }} >
            <>
                <Text variant={fontVariant.h4}>{t('changeLanguage')}</Text>
                <View style={styles.listContainer}>
                    <FlatList
                        data={Languages}
                        renderItem={(item) => renderItem(item)}
                        keyExtractor={(item, index) => `${item}${index}`}
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