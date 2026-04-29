import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { apiClient } from "./apiClient";
import type { GetToken } from "@clerk/shared/types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY6b47rPlqjcXVOMHfM3fI-XMwTzJAqzo",
  authDomain: "krishi-sahayak-v2.firebaseapp.com",
  projectId: "krishi-sahayak-v2",
  storageBucket: "krishi-sahayak-v2.firebasestorage.app",
  messagingSenderId: "732367701178",
  appId: "1:732367701178:web:aaa20bc19e94dc60c3ee83",
  measurementId: "G-7E5V2YYJZ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function saveTokenToServer(fmcToken: string, clerkToken: GetToken) {
  try {
    const device = navigator.userAgent || "unknown";
    await apiClient.patch(
      "api/v1/users/fcm-token",
      {
        fcmToken: fmcToken,
        device,
      },
      {
        headers: {
          Authorization: `Bearer ${await clerkToken()}`,
        },
      },
    );
    console.log("Token saved to server successfully");
  } catch (error) {
    console.error("Failed to save token to server:", error);
  }
}

export { messaging, saveTokenToServer };
