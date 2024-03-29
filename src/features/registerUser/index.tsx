import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Image, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot'
import Button, { SimpleButton } from '../../components/Button'
import Select from '../../components/Select'
import { useTheme } from 'styled-components'
import { setLanguage, setKeyStore } from '../../config/utils'
import { changeAppTheme } from '../../redux/actions/themeActions'
import CountriesListModal from '../../components/CountriesListModal'
import LanguagesListModal from '../../components/LanguagesListModal'
import { CountryImages, Countries, APIStatus, USERNAME_KEY } from '../../config/constants'
import CustomTextInput from '../../components/CustomTextInput'
import useForm from '../../hooks/useForm'
import { validationsLoginForm } from '../../config/validations'
import { useNavigation } from '@react-navigation/native'
import {
    ROUTE_USER_DASHBOARD
} from '../../config/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Text, { fontVariant } from '../../components/Text'
import { useSelector, useDispatch } from 'react-redux'
import { registerUserRequest } from '../../redux/actions/userRegistrationActions'
import FullScreenLoader from '../../components/FullScreenLoader'

interface RegisterUserProps { }

const RegisterUser: React.FC<RegisterUserProps> = (): JSX.Element => {
    const { t, i18n } = useTranslation()
    const theme = useTheme();
    const [languageModalVisible, setLanguageModalVisible] = useState<boolean>(false);
    const [countriesModalVisible, setCountriesModalVisible] = useState<boolean>(false);
    const [country, setCountry] = useState<string>('');
    const styles = getStyles()
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const dispatch = useDispatch()

    const countrySpecificUsernameValidationHelper: any = {
        [Countries.UAE]: `${t('validations.usernameHelperUAE')}`,
        [Countries.India]: `${t('validations.usernameHelperIndia')}`,
        [Countries.Pakistan]: `${t('validations.usernameHelperPak')}`,
        [Countries.Oman]: `${t('validations.usernameHelperOman')}`
    }

    const initialFormState = {
        username: '',
        password: '',
        firstName: '',
        lastName: ''
    }

    const {
        response,
        loading,
        error
    } = useSelector((state: any) => state.userRegistration)


    const validations = validationsLoginForm({ t, country }) || []
    const { values, isValid, errors, changeHandler, touched, setValues, setValid, setErrors } = useForm(initialFormState, validations);

    useEffect(() => {
        resetForm()
    }, [i18n.language]);

    useEffect(() => {
        if (!loading && response) {
            const { status } = response;
            if (status === APIStatus.Success) {
                onSaveUsername(values.username)
                navigation.navigate(ROUTE_USER_DASHBOARD)
            }
        }
    }, [response, loading]);

    const resetForm = () => {
        setValues(initialFormState)
        setValid(false)
        setErrors({})
    }

    const onOpenLanguageModal = () => {
        setLanguageModalVisible(true)
    }

    const onOpenCountryModal = () => {
        setCountriesModalVisible(true)
    }

    const onLanguageSelect = (item: string) => {
        setLanguage(item)
        setLanguageModalVisible(false)
    }

    const onSaveUsername = async (username: string) => {
        try {
            await setKeyStore(USERNAME_KEY, username);
        } catch (error) {
            console.error('Error saving username:', error);
        }
    };

    const onCountrySelect = (item: string) => {
        dispatch(changeAppTheme(item))
        setCountriesModalVisible(false)
        setCountry(item)
        resetForm()
    }

    const renderLanguageBottomSheet = () => {
        return (
            <LanguagesListModal {...{ languageModalVisible, setLanguageModalVisible, onLanguageSelect }} />
        )
    }

    const renderCountriesBottomSheet = () => {
        return (
            <CountriesListModal {...{ countriesModalVisible, setCountriesModalVisible, onCountrySelect }} />
        )
    }

    const onSubmitForm = () => {
        dispatch(registerUserRequest({ country, ...values }))
    }

    return (
        <View style={styles.rootContainer}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.topSection}>
                    <View style={styles.languageBtnContainer}>
                        <SimpleButton onPress={() => onOpenLanguageModal()} activeOpacity={0.7} testID="languageButton">
                            <FontAwesomeIcon icon={faGlobe} color={theme.PRIMARY_COLOR} size={24} />
                            <View style={styles.languageBtnTextContainer}>
                                <Text color={theme.PRIMARY_COLOR} variant={fontVariant.subtitle1}>{i18n.language.toUpperCase()}</Text>
                            </View>
                        </SimpleButton>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text variant={fontVariant.h3}>{t('title')}</Text>
                        <View style={styles.formTitleContainer}>
                            <Text color={theme.PRIMARY_COLOR} variant={fontVariant.h4}>{t('signup')}</Text>
                        </View>
                    </View>
                    <Text variant={fontVariant.caption1} >{t('countryFormLabel')}</Text>
                    <Select
                        left={country ?
                            <Image source={CountryImages[country]} style={styles.countryImage} /> :
                            <FontAwesomeIcon size={24} icon={faMapLocationDot} />
                        }
                        onPress={() => onOpenCountryModal()}
                        label={t('chooseCountry')}
                        value={country}
                        testID='selectContainer'
                    />
                    {country &&
                        <>
                            <CustomTextInput
                                value={values?.username}
                                onChangeText={(value: string) => changeHandler({ name: 'username', value })}
                                placeholder={t('username')}
                                helperText={country ? countrySpecificUsernameValidationHelper[country] : ''}
                                error={touched.username && errors.username}
                                maxLength={16}
                                testID="username"
                            />
                            <CustomTextInput
                                value={values?.password}
                                onChangeText={(value: string) => changeHandler({ name: 'password', value })}
                                placeholder={t('password')}
                                error={touched.password && errors.password}
                                maxLength={16}
                                secureTextEntry={true}
                                testID="password"
                            />
                            <CustomTextInput
                                value={values?.firstName}
                                onChangeText={(value: string) => changeHandler({ name: 'firstName', value })}
                                placeholder={t('firstName')}
                                error={touched.firstName && errors.firstName}
                                maxLength={16}
                                testID="firstName"
                            />
                            <CustomTextInput
                                value={values?.lastName}
                                onChangeText={(value: string) => changeHandler({ name: 'lastName', value })}
                                placeholder={t('lastName')}
                                error={touched.lastName && errors.lastName}
                                maxLength={16}
                                testID="lastName"
                            />
                        </>
                    }
                    {error &&
                        <Text color={theme.ERROR_TEXT_COLOR} variant={fontVariant.body2}>*{error}</Text>
                    }
                </View>
            </KeyboardAwareScrollView>
            <View>
                {country &&
                    <Button
                        disabled={!isValid}
                        onPress={() => onSubmitForm()}
                        title={t('register')}
                        testID="registerButton"
                    />
                }
            </View>
            {languageModalVisible && renderLanguageBottomSheet()}
            {countriesModalVisible && renderCountriesBottomSheet()}
            {loading && <FullScreenLoader />}
        </View>
    )
}

const getStyles = () => StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 22
    },
    topSection: {
        flex: 1
    },
    languageBtnContainer: {
        alignItems: 'flex-end',
        padding: 22,
        marginBottom: 30
    },
    languageBtnTextContainer: {
        marginLeft: 6
    },
    titleContainer: {
        alignItems: 'center'
    },
    formTitleContainer: {
        paddingVertical: 20
    },
    countryImage: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginHorizontal: 6
    },
})


export default RegisterUser;
