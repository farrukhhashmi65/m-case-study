import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomTextInput from '../CustomTextInput';
import { mockTheme } from '../../config/testUtils';

jest.mock('styled-components', () => ({
    ...jest.requireActual('styled-components'),
    useTheme: () => (mockTheme),
}));


test('renders CustomTextInput component', () => {
  const mockOnChangeText = jest.fn();

  const { getByPlaceholderText, getByTestId } = render(
    <CustomTextInput
      placeholder="First Name"
      onChangeText={mockOnChangeText}
    />
  );

  
  const textInput = getByPlaceholderText('First Name');

  fireEvent.changeText(textInput, 'Hello, Farrukh!');

  // Check if the onChangeText function is called with the correct text
  expect(mockOnChangeText).toHaveBeenCalledWith('Hello, Farrukh!');


});