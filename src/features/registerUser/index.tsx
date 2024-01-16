import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/reduxHooks'
import { useTranslation } from 'react-i18next'
import { View, Image, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot'
import Button, { SimpleButton } from '../../components/Button'
import Select from '../../components/Select'
import { useTheme } from 'styled-components'
import { setLanguage } from '../../config/utils'
import { changeAppTheme } from '../../redux/actions/themeActions'
import CountriesListModal from '../../components/CountriesListModal'
import LanguagesListModal from '../../components/LanguagesListModal'
import { CountryImages, Countries } from '../../config/constants'
import CustomTextInput from '../../components/CustomTextInput';
import useForm from '../../hooks/useForm'
import { validationsLoginForm } from '../../config/validations'
import { useNavigation } from '@react-navigation/native';
import {
    ROUTE_USER_DASHBOARD
} from '../../config/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Text, { fontVariant } from '../../components/Text';

const RegisterUser: React.FC<any> = (): JSX.Element => {
    const { t, i18n } = useTranslation()
    const theme = useTheme();
    const [languageModalVisible, setLanguageModalVisible] = useState<boolean>(false);
    const [countriesModalVisible, setCountriesModalVisible] = useState<boolean>(false);
    const [country, setCountry] = useState<string>('');
    const styles = getStyles()
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const countrySpecificUsernameValidationHelper: any = {
        [Countries.UAE]: `${t('validations.usernameHelperUAE')}`,
        [Countries.India]: `${t('validations.usernameHelperIndia')}`,
        [Countries.Pakistan]: `${t('validations.usernameHelperPak')}`,
        [Countries.Oman]: `${t('validations.usernameHelperOman')}`
    }

    const initialFormState: any = {
        username: '',
        password: '',
        firstName: '',
        lastName: ''
    }

    const validations = validationsLoginForm({ t, country }) || []
    const { values, isValid, errors, changeHandler, touched, setValues, setValid, setErrors } = useForm(initialFormState, validations);

    useEffect(() => {
        resetForm()
    }, [i18n.language]);

    const resetForm = () => {
        setValues(initialFormState)
        setValid(false)
        setErrors({})
    }

    const dispatch = useAppDispatch()

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

    return (
        <View style={styles.rootContainer}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.topSection}>
                    <View style={styles.languageBtnContainer}>
                        <SimpleButton onPress={() => onOpenLanguageModal()} activeOpacity={0.7}>
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
                    />
                    {country &&
                        <>
                            <CustomTextInput
                                value={values?.username}
                                onChange={(value: string) => changeHandler({ name: 'username', value })}
                                placeholder={t('username')}
                                helperText={country ? countrySpecificUsernameValidationHelper[country] : ''}
                                error={touched.username && errors.username}
                                maxLength={16}
                            />
                            <CustomTextInput
                                value={values?.password}
                                onChange={(value: string) => changeHandler({ name: 'password', value })}
                                placeholder={t('password')}
                                error={touched.password && errors.password}
                                maxLength={16}
                                secureTextEntry={true}
                            />
                            <CustomTextInput
                                value={values?.firstName}
                                onChange={(value: string) => changeHandler({ name: 'firstName', value })}
                                placeholder={t('firstName')}
                                error={touched.firstName && errors.firstName}
                                maxLength={16}
                            />
                            <CustomTextInput
                                value={values?.lastName}
                                onChange={(value: string) => changeHandler({ name: 'lastName', value })}
                                placeholder={t('lastName')}
                                error={touched.lastName && errors.lastName}
                                maxLength={16}
                            />
                        </>
                    }
                </View>
            </KeyboardAwareScrollView>
            <View>
                {country &&
                    <Button
                        disabled={!isValid}
                        onPress={() => navigation.navigate(ROUTE_USER_DASHBOARD)}
                        title={t('register')}
                    />
                }
            </View>
            {languageModalVisible && renderLanguageBottomSheet()}
            {countriesModalVisible && renderCountriesBottomSheet()}
        </View>
    )
}

const getStyles = () => StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 22
    },
    topSection :{
        flex: 1
    },
    languageBtnContainer: {
        alignItems: 'flex-end',
        padding: 22,
        marginBottom: 30
    },
    languageBtnTextContainer:{ 
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
