import React from 'react';
import { useTheme } from 'styled-components'
import { StyleSheet, TextInput, View } from 'react-native'
import Text, { fontVariant } from './Text';

const CustomTextInput: React.FC<any> = (props): JSX.Element => {
    const theme = useTheme();
    const styles = getStyles(theme, props)
    const { value = '', onChange, placeholder = '', keyboardType = 'default', error, helperText, ...rest } = props;

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                keyboardType={keyboardType}
                placeholderTextColor={theme.PRIMARY_TEXT_COLOR}
                {...rest}
            />
            {error &&
                <View style={styles.helperContainer}>
                    <Text color={theme.ERROR_TEXT_COLOR} variant={fontVariant.caption1}>{error}</Text>
                </View>
            }
            {helperText &&
                <View style={styles.helperContainer}>
                    <Text color={theme.PRIMARY_TEXT_COLOR_LIGHT} variant={fontVariant.caption1}>{helperText}</Text>
                </View>
            }
        </View>

    )
}

const getStyles = (theme: any, props: any) => StyleSheet.create({
    inputContainer: {
        marginVertical: 12,
    },
    input: {
        height: 54,
        borderWidth: 1,
        padding: 12,
        width: '100%',
        alignItems: 'center',
        borderColor: props.error ? theme.ERROR_TEXT_COLOR : theme.PRIMARY_TEXT_COLOR,
        borderRadius: 8
    },
    helperContainer: {
        marginTop: 4
    },
})


export default CustomTextInput;