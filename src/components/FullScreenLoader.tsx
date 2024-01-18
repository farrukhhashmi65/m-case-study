import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components'

const FullScreenLoader = () => {
    const theme = useTheme();
    const styles = getStyles()

    return (
        <View style={styles.overlay} testID='fullScreenLoader'>
            <ActivityIndicator size="large" color={theme.PRIMARY_COLOR} />
        </View>
    );
};

const getStyles = () => StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white background
        justifyContent: 'center',
        alignItems: 'center',
    },
})


export default FullScreenLoader;