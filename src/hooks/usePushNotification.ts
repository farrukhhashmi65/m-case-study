import React from 'react';
import messaging, { firebase } from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';

// firebase config

const RNfirebaseConfig: any = {
    apiKey: "AIzaSyDJ1-MBw0yn6PJHlAC4VK0MuHsKAXP_MQk",
    authDomain: "mashreq-web-push.firebaseapp.com",
    projectId: "mashreq-web-push",
    databaseURL: 'https://mashreq-web-push-default-rtdb.firebaseio.com/',
    storageBucket: "mashreq-web-push.appspot.com",
    messagingSenderId: "505157567702",
    appId: Platform.select({ ios: "1:505157567702:ios:676c5b638f7e20035bb577", android: "1:505157567702:android:2353d3f7c215e9a85bb577" })
};

// I didn't remove the console from this file in case you want to check notification messages or consoles.

const usePushNotification = () => {

    const initializeFCMPushNotification = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(RNfirebaseConfig);
        }
    }

    const registerAppWithFCM = async () => {
        try {
            if (Platform.OS === 'ios') {
                const registerFCM: any = await messaging().registerDeviceForRemoteMessages();
                console.log('Register status:', registerFCM);
                if (registerFCM) {
                    const fcmToken = await getFCMToken();
                    if (fcmToken) {
                        console.log('Register Fcm  status & fcmToken :', {
                            registerFCM,
                            fcmToken
                        });
                    }
                }
            } else if (Platform.OS === 'android') {
                getFCMToken();
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    const requestUserPermission = async () => {
        if (Platform.OS === 'ios') {
            //Request iOS permission
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log('Authorization status:', authStatus);
            }
        } else if (Platform.OS === 'android') {
            //Request Android permission (For API level 33+, for 32 or below is not required)
            const res = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );
        }
    }

    const getFCMToken = async () => {
        const fcmToken = await messaging().getToken();

        if (fcmToken) {
            console.log('Your Firebase Token is:', fcmToken);
            return fcmToken;
        } else {
            console.log('Failed', 'No token received');
            return -1
        }
    };

    const listenToForegroundNotifications = async () => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log(
                'A new message arrived! (FOREGROUND)',
                JSON.stringify(remoteMessage),
            );
            const { notification, data } = remoteMessage;

            const channelId = await notifee.createChannel({
                id: `${remoteMessage.sentTime}` + Math.random(),
                name: `${remoteMessage.sentTime}` + Math.random(),
                importance: AndroidImportance.HIGH,
            });

            await notifee.displayNotification({
                title: notification?.title,
                body: notification?.body,
                android: {
                    channelId,
                    importance: AndroidImportance.HIGH,
                },
            });

        });
        return unsubscribe;
    }

    const listenToBackgroundNotifications = async () => {
        const unsubscribe = messaging().setBackgroundMessageHandler(
            async remoteMessage => {
                console.log(
                    'A new message arrived! (BACKGROUND)',
                    JSON.stringify(remoteMessage),
                );
            },
        );
        return unsubscribe;
    }

    const onNotificationOpenedAppFromBackground = async () => {
        const unsubscribe = messaging().onNotificationOpenedApp(
            async remoteMessage => {
                console.log(
                    'App opened from BACKGROUND by tapping notification:',
                    JSON.stringify(remoteMessage),
                );
            },
        );
        return unsubscribe;
    };

    const onNotificationOpenedAppFromQuit = async () => {
        const message = await messaging().getInitialNotification();

        if (message) {
            console.log('App opened from QUIT by tapping notification:', JSON.stringify(message));
        }
    };

    return {
        initializeFCMPushNotification,
        requestUserPermission,
        registerAppWithFCM,
        listenToForegroundNotifications,
        listenToBackgroundNotifications,
        onNotificationOpenedAppFromBackground,
        onNotificationOpenedAppFromQuit,
    };
};

export default usePushNotification;