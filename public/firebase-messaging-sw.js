importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAlYUcwWTOpsg3yTGC2tEl6ufl_GUQoOfo",
  authDomain: "vispace-ed2ac.firebaseapp.com",
  projectId: "vispace-ed2ac",
  storageBucket: "vispace-ed2ac.appspot.com",
  messagingSenderId: "351864430510",
  appId: "1:351864430510:web:0bd27b05c1f74b5db4323f"
});
// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
      body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});