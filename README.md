
# Mashreq mobile assessment 

 * Registration Form for user -  Country specific validation
 * Country specific vaalidations for username
 * Theme change is both on after country and same can be done after login.
 * Styled component and JSX component both are there. 
 * Styled base theme implementation
 * Three languages implement - English, Russian and French
 * Axios is getting use for API call 
 * Redux saga for state management
 * React testing library/Jest for testing
 * For push notification, FCM. (Android, IOS don't have certificates for APN)


Note: 
For Android - To test the API on emulator,  change it with your local IP instead of localhost in network.ts file. 

## Step 1: Installation

```bash
# for node modules
yarn

# ios - installation
pod install
```

## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash

# using Yarn
yarn android
```

### For iOS

```bash


# using Yarn
yarn ios
```

Or you can start it directly on Xcode or Android studio

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.


## Firebase config

Create firebase project on https://console.firebase.google.com/u/0/ .
Change it with your own configuration, and change GoogleService-Info.plist and google-services.json

This is my configuration on my firebase project.

```javascript
const RNfirebaseConfig: any = {
    apiKey: "AIzaSyDJ1-MBw0yn6PJHlAC4VK0MuHsKAXP_MQk",
    authDomain: "mashreq-web-push.firebaseapp.com",
    projectId: "mashreq-web-push",
    databaseURL: 'https://mashreq-web-push-default-rtdb.firebaseio.com/',
    storageBucket: "mashreq-web-push.appspot.com",
    messagingSenderId: "505157567702",
    appId: Platform.select({ ios: "1:505157567702:ios:676c5b638f7e20035bb577", android: "1:505157567702:android:2353d3f7c215e9a85bb577" })
};

```

To test the Push notification on Android with my settings, open https://testfcm.com/  

For now use my Server Key* 

AAAAdZ28xNY:APA91bHjO-kn9XH3r7Lr8ZZUhurfbo-AKH8Zr1xWZJisLm0r6HfFEvypEc9b_LQ4uLPuNYihMSIaJDtFcCMmG8k4F0HqKar4OsKsc-WZbO0I6JUtzgQ2N_IlBrFVoTvKF_VjLlf7txOJ

and copy from console:

Your Firebase Token is: f9WPwcVdToGSONAjBsBvEN:APA91bEtFkxuQ-q6bYhSAknZ_HGCPLtTUEgnuVtZNzul3GCXMnypSnPDSMn8_-TWqXJem_-XHGs1NSicEtPSLj-b5Ops_OyJifLw3y8ftnwrlGZwZn-SivJz1_5jVE1CsJ6HZFG8RFLI

You can test it on Android, For IOS, I don't have app certificate so you will not abe to do anything.
