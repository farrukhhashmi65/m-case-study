import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet } from 'react-native'
import Text, { fontVariant } from '../../components/Text';

const Dashboard: React.FC<any> = (): JSX.Element => {
    const { t } = useTranslation()
    const styles = getStyles()

    return (
        <View style={styles.rootContainer}>
            <Text variant={fontVariant.h4}>{t('welcome')}</Text>
        </View>
    )
}

const getStyles = () => StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 22
    },
})


export default Dashboard;
