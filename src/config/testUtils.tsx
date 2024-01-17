import React, { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import { setupStore } from '../redux/store'
import { render } from '@testing-library/react-native';


export const mockTheme = {
  // Your theme object goes here
  PRIMARY_TEXT_COLOR: '#3d3d3d',
  ERROR_TEXT_COLOR: '#cc0000',
  PRIMARY_TEXT_COLOR_LIGHT: '#797979',
  PRIMARY_COLOR_FAINT: '#FFF3E0',
  PRIMARY_COLOR_LIGHT: '#FFB74D',
  DISBALED_COLOR: '#D3D3D3',
  PRIMARY_COLOR: "#FF9800",
  SECONDARY_TEXT_COLOR: "#ffffff"
};


export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
          <NavigationContainer>
            <ThemeProvider theme={mockTheme}>
              {children}
            </ThemeProvider>
          </NavigationContainer>
      </Provider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}



