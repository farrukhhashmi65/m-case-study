import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LanguagesListModal from '../LanguagesListModal';
import { mockTheme } from '../../config/testUtils';

jest.mock('react-i18next', () => ({
    // mock useTranslation hook 
    useTranslation: () => {
        return {
            t: (str: string) => str,
        }
    },
}))

jest.mock('styled-components', () => ({
    ...jest.requireActual('styled-components'),
    useTheme: () => (mockTheme),
}));


test('renders LanguagesListModal component', () => {
  const mockSetLanguageModalVisible = jest.fn();
  const mockOnLanguageSelect = jest.fn();

  const { getByTestId } = render(
    <LanguagesListModal
      languageModalVisible={true}
      setLanguageModalVisible={mockSetLanguageModalVisible}
      onLanguageSelect={mockOnLanguageSelect}
    />
  );


  // Simulate pressing a language in the list
  fireEvent.press(getByTestId('languageListItem_0')); // Use the correct index

  // Check if the onLanguageSelect function is called
  expect(mockOnLanguageSelect).toHaveBeenCalled();

});