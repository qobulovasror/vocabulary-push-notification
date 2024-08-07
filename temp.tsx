import React, { useEffect } from 'react';
import { Button, SafeAreaView, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Permissions from 'expo-permissions';

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => console.log(token));
    registerBackgroundNotificationTask();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Platform.OS === 'web') {
      return;
    }

    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  };

  const registerBackgroundNotificationTask = async () => {
    try {
      await BackgroundFetch.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK, {
        minimumInterval: 300, // 5 minutes
        stopOnTerminate: false, // Android only
        startOnBoot: true,     // Android only
      });
      console.log('Background task registered');
    } catch (err) {
      console.log('Error registering background task', err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Trigger Notification"
        onPress={async () => {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Time's up!",
              body: 'This is your 5-minute notification.',
            },
            trigger: null,
          });
        }}
      />
    </SafeAreaView>
  );
}

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, async () => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time's up!",
        body: 'This is your 5-minute notification.',
      },
      trigger: null,
    });
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});
