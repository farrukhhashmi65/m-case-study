import React from 'react';
import RegisterUser from '../index';
import { mockTheme, renderWithProviders } from '../../../config/testUtils';
import { fireEvent } from '@testing-library/react-native';

jest.mock('styled-components', () => ({
    ...jest.requireActual('styled-components'),
    useTheme: () => (mockTheme),
}));


jest.mock('react-i18next', () => ({
    // mock useTranslation hook 
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: jest.fn(),
                language: 'EN'
            }
        }
    }
}))

jest.mock('i18next', () => ({
    changeLanguage: jest.fn(),
    dir: jest.fn(),
}))


jest.mock('react-redux', () => {
    return {
        ...jest.requireActual('react-redux'),
        useSelector: jest.fn().mockImplementation(() => ({})),
        useDispatch: () => jest.fn(),
    };
});

jest.mock('@fortawesome/react-native-fontawesome', () => ({
    FontAwesomeIcon: ''
}))

jest.mock('react-native-keyboard-aware-scroll-view', () => {
    const KeyboardAwareScrollView = ({ children }: any) => children;
    return { KeyboardAwareScrollView };
});



test('renders RegisterUser component', async () => {

    // Render the component with mocked dependencies
    const { toJSON , getByTestId } = renderWithProviders(<RegisterUser/>);
    fireEvent.press(getByTestId('languageButton')); 
    fireEvent.press(getByTestId('selectContainer')); 
    fireEvent.press(getByTestId('languageListItem_0')); 
    fireEvent.press(getByTestId('countryListItem_0')); 


    const usernameInput = getByTestId('username');
    // Simulate user input in the username field
    fireEvent.changeText(usernameInput, 'testUsername');

    const passwordInput = getByTestId('password');
    // Simulate user input in the password field
    fireEvent.changeText(passwordInput, 'testUser@123');

    const firstNameInput = getByTestId('firstName');
    // Simulate user input in the firstName field
    fireEvent.changeText(firstNameInput, 'Farrukh');

    const lastNameInput = getByTestId('lastName');
    // Simulate user input in the lastName field
    fireEvent.changeText(lastNameInput, 'Hashmi');

    // Expect the component to match the snapshot
    expect(toJSON()).toMatchSnapshot();
});