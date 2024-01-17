import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import BottomSheetModal from './BottomSheetModal';
import Button from './Button';
import Separator from './Separator';
import { useTranslation } from 'react-i18next'
import { Countries, CountryImages } from '../config/constants'
import Text, { fontVariant } from './Text';

interface CountriesListModalProps {
    countriesModalVisible: boolean;
    setCountriesModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onCountrySelect: (country: string) => void;
}

interface RenderItemProps {
    item: string;
    index: number;
}

const CountriesListModal: React.FC<CountriesListModalProps> = (props: CountriesListModalProps): JSX.Element => {
    const { t } = useTranslation()
    const styles = getStyles()

    const { countriesModalVisible, setCountriesModalVisible, onCountrySelect } = props;

    const renderItem = ({ item, index }: RenderItemProps) => (
        <TouchableOpacity onPress={() => onCountrySelect(item)} style={styles.listItem} activeOpacity={0.7} testID={`countryListItem_${index}`}>
            <Image source={CountryImages[item]} style={styles.countryImage} />
            <Text variant={fontVariant.body2}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <BottomSheetModal {...{ modalVisible: countriesModalVisible, setModalVisible: setCountriesModalVisible }} >
            <>
                <Text variant={fontVariant.h4}>{t('chooseCountry')}</Text>
                <View style={styles.listContainer}>
                    <FlatList
                        data={Object.keys(Countries)}
                        renderItem={(item) => renderItem(item)}
                        keyExtractor ={(item, index) => `${item}${index}`}
                        ItemSeparatorComponent={() => <Separator />}
                    />
                </View>
                <Button
                    onPress={() => setCountriesModalVisible(false)}
                    title={t('close')}
                />
            </>
        </BottomSheetModal>
    )
}


const getStyles = () => StyleSheet.create({
    listItem: {
        height: 54,
        alignItems: 'center',
        flexDirection: 'row'
    },
    listContainer: {
        marginVertical: 12
    },
    countryImage: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginHorizontal: 6
    }
})


export default CountriesListModal;