import React from 'react';
import Dashboard from '../index';
import { renderWithProviders, mockTheme } from '../../../config/testUtils';

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

test('renders dashboard', () => {
    const { toJSON  } = renderWithProviders(<Dashboard/>);
  expect(toJSON()).toMatchSnapshot();

});