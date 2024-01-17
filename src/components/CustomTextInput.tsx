import React from 'react';
import { useTheme } from 'styled-components'
import { StyleSheet, TextInput, View, TextInputProps } from 'react-native'
import Text, { fontVariant } from './Text';

interface CustomTextInputProps extends TextInputProps {
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    error?: string;
    helperText?: string;
    testID? : string
  }

const CustomTextInput: React.FC<CustomTextInputProps> = (props : CustomTextInputProps): JSX.Element => {
    const theme = useTheme();
    const { value = '', onChangeText, placeholder = '', keyboardType = 'default', error, helperText, testID, ...rest } = props;
    const styles = getStyles(theme, error)

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                keyboardType={keyboardType}
                placeholderTextColor={theme.PRIMARY_TEXT_COLOR}
                testID={testID}
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

const getStyles = (theme: any, error: any) => StyleSheet.create({
    inputContainer: {
        marginVertical: 12,
    },
    input: {
        height: 54,
        borderWidth: 1,
        padding: 12,
        width: '100%',
        alignItems: 'center',
        borderColor: error ? theme.ERROR_TEXT_COLOR : theme.PRIMARY_TEXT_COLOR,
        borderRadius: 8
    },
    helperContainer: {
        marginTop: 4
    },
})


export default CustomTextInput;