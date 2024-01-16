import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import BottomSheetModal from './BottomSheetModal';
import Button from './Button';
import Separator from './Separator';
import { useTranslation } from 'react-i18next'
import { Countries, CountryImages } from '../config/constants'
import Text, { fontVariant } from './Text';

const CountriesList: React.FC<any> = (props): JSX.Element => {
    const { t } = useTranslation()
    const styles = getStyles()

    const { countriesModalVisible, setCountriesModalVisible, onCountrySelect } = props;

    const renderItem = (row: any): any => (
        <TouchableOpacity onPress={() => onCountrySelect(row.item)} style={styles.listItem} activeOpacity={0.7}>
            <Image source={CountryImages[row.item]} style={styles.countryImage}/>
            <Text variant={fontVariant.body2}>{row.item}</Text>
        </TouchableOpacity>
    );

    return (
        <BottomSheetModal {...{ modalVisible: countriesModalVisible, setModalVisible: setCountriesModalVisible }} >
            <>
                <Text variant={fontVariant.h4}>{t('chooseCountry')}</Text>
                <View style={styles.listContainer}>
                    <FlatList
                        data={Object.keys(Countries)}
                        renderItem={renderItem}
                        keyExtractor={(item) => item}
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
    countryImage : { 
        width : 24, 
        height : 24, 
        resizeMode: 'contain', 
        marginHorizontal : 6
    }
})


export default CountriesList;