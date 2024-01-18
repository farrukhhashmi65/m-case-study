import React from 'react';
import { render } from '@testing-library/react-native';
import FullScreenLoader from '../FullScreenLoader';
import { mockTheme } from '../../config/testUtils';

jest.mock('styled-components', () => ({
  ...jest.requireActual('styled-components'),
  useTheme: () => (mockTheme),
}));

test('renders FullScreenLoader', () => {
  const { getByTestId } = render(<FullScreenLoader />);
  const loader = getByTestId('fullScreenLoader');

  expect(loader).toBeTruthy();
});