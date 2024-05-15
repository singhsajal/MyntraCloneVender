import messaging from '@react-native-firebase/messaging';
export const pushNotification = async () => {


    try {
        // Get the FCM token for the device
        const fcmToken = await messaging().getToken();
        console.log('FCM token:', fcmToken);

        // Construct the notification message
        const message = {
            token: fcmToken,
            notification: {
                title: 'New Product Added',
                body: 'A new product has been added to the store.'
            }
        };

        // Send the notification
        const notification = await messaging().sendMessage(message)
        // alert()
        console.log('Notification sent successfully');

    } catch (error) {
        console.error('Error sending notification:', error);
    }
};



