import React from 'react'
import { useAppSelector } from '../../redux/reduxHooks'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'styled-components'
import Text, { fontVariant } from '../../components/Text';

const Dashboard: React.FC<any> = (): JSX.Element => {
    const { t } = useTranslation()
    const theme = useTheme();
    const styles = getStyles(theme)

    return (
        <View style={styles.rootContainer}>
            <Text variant={fontVariant.h4}>{t('welcome')}</Text>
        </View>
    )
}

const getStyles = (theme: any) => StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 22
    },
})


export default Dashboard;
