import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterUser from '../features/registerUser';
import Dashboard from '../features/dashboard';
import * as Routes from './routes';
import { ThemeProvider } from "styled-components";
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator();
const AppNavigation = () => {

  const {
    theme
  } = useSelector((state: any) => state.themeReducer)
  const styles = getStyles(theme)

  // App Navigation
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.PRIMARY_BACKGROUND_COLOR
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <NavigationContainer theme={MyTheme} >
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name={Routes.ROUTE_USER_REGISTRATION}
              component={RegisterUser}
            />
            <Stack.Screen
              name={Routes.ROUTE_USER_DASHBOARD}
              component={Dashboard}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const getStyles = (theme : any) => StyleSheet.create({
  safeAreaContainer: {
      flex: 1,
      backgroundColor: theme.PRIMARY_BACKGROUND_COLOR
  },
})

export default AppNavigation;