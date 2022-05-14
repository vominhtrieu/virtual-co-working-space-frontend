importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyA60w72t95mZ6wNULiuQnG4Ufl_7wwTEiM",
    authDomain: "push-9bfc4.firebaseapp.com",
    projectId: "push-9bfc4",
    storageBucket: "push-9bfc4.appspot.com",
    messagingSenderId: "645986432",
    appId: "1:645986432:web:d8cb947e20d0999ed90e65",
    measurementId: "G-88101N6FWD"
  };
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});