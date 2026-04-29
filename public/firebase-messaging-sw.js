// public/firebase-messaging-sw.js

importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js",
);

const firebaseConfig = {
  apiKey: "AIzaSyDY6b47rPlqjcXVOMHfM3fI-XMwTzJAqzo",
  authDomain: "krishi-sahayak-v2.firebaseapp.com",
  projectId: "krishi-sahayak-v2",
  storageBucket: "krishi-sahayak-v2.firebasestorage.app",
  messagingSenderId: "732367701178",
  appId: "1:732367701178:web:aaa20bc19e94dc60c3ee83",
  measurementId: "G-7E5V2YYJZ9",
};
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("[SW] Received background message:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/vite.svg", // optional
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
